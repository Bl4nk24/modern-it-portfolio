(async function () {
  const canvas = document.querySelector("#orbitScene");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try {
    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 2.8, 8.2);

    const root = new THREE.Group();
    root.rotation.x = -0.34;
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 5, 6);
    scene.add(key);

    const rim = new THREE.PointLight(0x38bdf8, 2.2, 16);
    rim.position.set(-4, -1, 4);
    scene.add(rim);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.36,
      side: THREE.DoubleSide
    });

    [2.35, 3.18, 4.0].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 12, 160), ringMaterial.clone());
      ring.material.opacity = 0.34 - index * 0.06;
      ring.rotation.x = Math.PI / 2;
      ring.rotation.z = index * 0.18;
      root.add(ring);
    });

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(1.22, 1.48, 0.26, 72),
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.28,
        roughness: 0.32
      })
    );
    platform.position.y = -0.05;
    root.add(platform);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(1.55, 1.75, 0.16, 72),
      new THREE.MeshStandardMaterial({
        color: 0xdbeafe,
        metalness: 0.26,
        roughness: 0.38
      })
    );
    base.position.y = -0.26;
    root.add(base);

    const tileColors = [0xf25022, 0x7fba00, 0x00a4ef, 0xffb900];
    tileColors.forEach((color, index) => {
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.08, 0.45),
        new THREE.MeshStandardMaterial({ color, metalness: 0.18, roughness: 0.28 })
      );
      tile.position.set(index % 2 === 0 ? -0.25 : 0.25, 0.13, index < 2 ? -0.25 : 0.25);
      tile.castShadow = false;
      root.add(tile);
    });

    const nodeColors = [0x2563eb, 0x38bdf8, 0x60a5fa, 0x111827, 0x10b981, 0xf59e0b];
    const nodes = new THREE.Group();
    nodeColors.forEach((color, index) => {
      const angle = (index / nodeColors.length) * Math.PI * 2;
      const radius = index % 2 === 0 ? 3.16 : 3.65;
      const geometry = index === 3 ? new THREE.BoxGeometry(0.34, 0.34, 0.34) : new THREE.SphereGeometry(0.18, 32, 16);
      const node = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: index === 3 ? 0.18 : 0.32,
          metalness: 0.22,
          roughness: 0.24
        })
      );
      node.position.set(Math.cos(angle) * radius, 0.04, Math.sin(angle) * radius);
      nodes.add(node);

      const spokeGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0.02, 0),
        new THREE.Vector3(node.position.x, 0.02, node.position.z)
      ]);
      const spoke = new THREE.Line(
        spokeGeometry,
        new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.42 })
      );
      nodes.add(spoke);
    });
    root.add(nodes);

    const pointer = { x: 0, y: 0 };
    canvas.addEventListener(
      "pointermove",
      (event) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45;
        pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.25;
      },
      { passive: true }
    );

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function animate(time) {
      root.rotation.y = time * 0.00018 + pointer.x;
      root.rotation.x = -0.34 + pointer.y;
      nodes.rotation.y = prefersReducedMotion ? 0.2 : time * 0.00032;
      renderer.render(scene, camera);
      if (!prefersReducedMotion) requestAnimationFrame(animate);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  } catch (error) {
    drawFallback(canvas);
  }

  function drawFallback(target) {
    const ctx = target.getContext("2d");
    const rect = target.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    target.width = Math.floor(rect.width * ratio);
    target.height = Math.floor(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
    ctx.lineWidth = 2;
    [74, 112, 150].forEach((radius) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.55, radius * 0.62, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
    ["#f25022", "#7fba00", "#00a4ef", "#ffb900"].forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(cx - 34 + (index % 2) * 36, cy - 34 + Math.floor(index / 2) * 36, 30, 30);
    });
  }
})();
