import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

type ContactPayload = {
  name: string;
  email: string;
  topic?: string;
  message: string;
  language?: "de" | "en";
  source_url?: string;
  user_agent?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}

function clean(value: unknown, max = 4000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function getSecretKey() {
  const legacy = clean(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
  if (legacy) return legacy;

  const secretKeys = clean(Deno.env.get("SUPABASE_SECRET_KEYS"), 10000);
  if (!secretKeys) return "";

  try {
    const parsed = JSON.parse(secretKeys) as Record<string, string>;
    return parsed.default || Object.values(parsed).find(Boolean) || "";
  } catch {
    return "";
  }
}

function validate(raw: Record<string, unknown>): ContactPayload {
  const payload = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 180).toLowerCase(),
    topic: clean(raw.topic, 120),
    message: clean(raw.message, 4000),
    language: clean(raw.language, 2) === "en" ? "en" : "de",
    source_url: clean(raw.source_url, 500),
    user_agent: clean(raw.user_agent, 500)
  } satisfies ContactPayload;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
  const errors = [
    payload.name.length < 2 ? "name" : "",
    !emailOk ? "email" : "",
    payload.message.length < 10 ? "message" : ""
  ].filter(Boolean);

  if (errors.length) {
    throw new Error(`Invalid contact payload: ${errors.join(", ")}`);
  }

  return payload;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatText(payload: ContactPayload) {
  return [
    "Neue Portfolio-Nachricht",
    "",
    `Name: ${payload.name}`,
    `E-Mail: ${payload.email}`,
    `Thema: ${payload.topic || "Kein Thema"}`,
    `Sprache: ${payload.language || "de"}`,
    `Quelle: ${payload.source_url || "Unbekannt"}`,
    "",
    payload.message
  ].join("\n");
}

function formatHtml(payload: ContactPayload) {
  const rows = [
    ["Name", payload.name],
    ["E-Mail", payload.email],
    ["Thema", payload.topic || "Kein Thema"],
    ["Sprache", payload.language || "de"],
    ["Quelle", payload.source_url || "Unbekannt"]
  ]
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`)
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111827">
      <h1 style="font-size:20px;margin:0 0 16px">Neue Portfolio-Nachricht</h1>
      ${rows}
      <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0" />
      <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  let payload: ContactPayload;
  try {
    payload = validate((await request.json()) as Record<string, unknown>);
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : "Invalid request" }, 400);
  }

  const supabaseUrl = clean(Deno.env.get("SUPABASE_URL"), 500);
  const secretKey = getSecretKey();
  if (!supabaseUrl || !secretKey) {
    return json({ ok: false, error: "Supabase function secrets are not available." }, 500);
  }

  const supabase = createClient(supabaseUrl, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const { data: messageRow, error: insertError } = await supabase
    .from("contact_messages")
    .insert({ ...payload, email_status: "pending" })
    .select("id")
    .single();

  if (insertError || !messageRow) {
    return json({ ok: false, error: insertError?.message || "Could not store contact message." }, 500);
  }

  const resendKey = clean(Deno.env.get("RESEND_API_KEY"), 1000);
  const toEmail = clean(Deno.env.get("CONTACT_TO_EMAIL"), 320);
  const fromEmail = clean(Deno.env.get("CONTACT_FROM_EMAIL"), 320);

  if (!resendKey || !toEmail || !fromEmail) {
    await supabase
      .from("contact_messages")
      .update({
        email_status: "not_configured",
        email_error: "Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL"
      })
      .eq("id", messageRow.id);

    return json({
      ok: true,
      mode: "stored",
      email_sent: false,
      id: messageRow.id,
      reason: "mail_not_configured"
    });
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject: `Portfolio Kontakt: ${payload.topic || payload.name}`,
      text: formatText(payload),
      html: formatHtml(payload)
    })
  });

  const emailData = await emailResponse.json().catch(() => ({}));

  if (!emailResponse.ok) {
    await supabase
      .from("contact_messages")
      .update({
        email_status: "failed",
        email_error: JSON.stringify(emailData).slice(0, 1000)
      })
      .eq("id", messageRow.id);

    return json({ ok: true, mode: "stored", email_sent: false, id: messageRow.id }, 202);
  }

  await supabase
    .from("contact_messages")
    .update({
      email_status: "sent",
      notified_at: new Date().toISOString()
    })
    .eq("id", messageRow.id);

  return json({ ok: true, mode: "email", email_sent: true, id: messageRow.id });
});
