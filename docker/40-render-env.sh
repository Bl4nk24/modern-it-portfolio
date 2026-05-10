#!/bin/sh
set -eu

SUPABASE_URL="${SUPABASE_URL:-https://pkkjrxlubgddvuesqtpf.supabase.co}"
SUPABASE_PUBLISHABLE_KEY="${SUPABASE_PUBLISHABLE_KEY:-sb_publishable_RnqBLxrvc4SUMM5aZiTKGg_SigsBtn8}"
CONTACT_FUNCTION_URL="${CONTACT_FUNCTION_URL:-https://pkkjrxlubgddvuesqtpf.supabase.co/functions/v1/contact-notify}"
ANALYTICS_ENABLED="${ANALYTICS_ENABLED:-true}"

cat > /usr/share/nginx/html/assets/env.js <<EOF
window.PORTFOLIO_ENV = {
  SUPABASE_URL: "${SUPABASE_URL}",
  SUPABASE_PUBLISHABLE_KEY: "${SUPABASE_PUBLISHABLE_KEY}",
  CONTACT_FUNCTION_URL: "${CONTACT_FUNCTION_URL}",
  ANALYTICS_ENABLED: "${ANALYTICS_ENABLED}"
};
EOF
