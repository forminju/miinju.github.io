// Cursor-following rabbit mascot
(function () {
  const BASE = "/assets/img/me/nobg/";

  // Page-based default pose
  const path = window.location.pathname;
  let defaultPose = "vi_rabbit.png";
  if (path.includes("/publications")) defaultPose = "study_rabbit.png";
  else if (path.includes("/projects"))   defaultPose = "think_rabbit.png";
  else if (path.includes("/cv"))         defaultPose = "suprise_rabbit.png";

  // About page scroll poses
  const SCROLL_POSES = {
    ".news-list":    "suprise_rabbit.png",
    ".timeline":     "think_rabbit.png",
    ".publications": "study_rabbit.png",
    ".post-title":   "vi_rabbit.png",
  };

  // Build element
  const el = document.createElement("div");
  el.id = "rabbit-mascot";
  el.innerHTML = `<img id="rabbit-img" src="${BASE + defaultPose}" alt="" />`;
  document.body.appendChild(el);

  const img = document.getElementById("rabbit-img");

  // Smooth follow — tight & fast
  let tx = -200, ty = -200;
  let cx = tx,   cy = ty;

  document.addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  let prevX = tx;
  function loop() {
    const EASE = 0.22; // faster follow
    cx += (tx - cx) * EASE;
    cy += (ty - cy) * EASE;

    const vx = cx - prevX;
    const tilt = Math.max(-14, Math.min(14, vx * 2));
    const flip = vx < -0.5 ? -1 : 1;

    // Offset: slightly below-right of cursor tip
    el.style.transform = `translate(${cx + 10}px, ${cy + 10}px)`;
    img.style.transform = `scaleX(${flip}) rotate(${tilt * flip}deg)`;

    prevX = cx;
    requestAnimationFrame(loop);
  }

  setTimeout(() => { img.classList.add("rabbit-visible"); loop(); }, 300);

  // Scroll pose switching (about page only)
  let current = defaultPose;

  function setPose(pose) {
    if (current === pose) return;
    current = pose;
    img.classList.remove("rabbit-visible");
    setTimeout(() => {
      img.src = BASE + pose;
      img.classList.add("rabbit-visible");
    }, 120);
  }

  if (path === "/" || path === "/index.html" || path === "") {
    Object.entries(SCROLL_POSES).forEach(([selector, pose]) => {
      const el = document.querySelector(selector);
      if (!el) return;
      new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) setPose(pose); }),
        { threshold: 0.4 }
      ).observe(el);
    });
  }
})();
