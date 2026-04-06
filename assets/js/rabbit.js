// Alive cursor-following rabbit mascot
(function () {
  const BASE = "/assets/img/me/nobg/";
  const POSES = {
    default:      BASE + "vi_rabbit.png",
    news:         BASE + "suprise_rabbit.png",
    background:   BASE + "think_rabbit.png",
    publications: BASE + "study_rabbit.png",
  };

  const rabbit = document.createElement("div");
  rabbit.id = "rabbit-mascot";
  rabbit.innerHTML = `<img id="rabbit-img" src="${POSES.default}" alt="" />`;
  document.body.appendChild(rabbit);

  const img = document.getElementById("rabbit-img");

  // Smooth follow
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX, curY = mouseY;
  let velX = 0, velY = 0;
  let prevX = mouseX;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    const EASE = 0.09;
    velX = (mouseX - curX) * EASE;
    velY = (mouseY - curY) * EASE;
    curX += velX;
    curY += velY;

    // Tilt based on horizontal velocity
    const tilt = Math.max(-18, Math.min(18, velX * 2.5));

    rabbit.style.transform = `translate(${curX + 14}px, ${curY + 14}px)`;
    img.style.transform = `rotate(${tilt}deg) scaleX(${velX < -1 ? -1 : 1})`;

    prevX = curX;
    requestAnimationFrame(animate);
  }

  setTimeout(() => {
    img.classList.add("rabbit-visible");
    animate();
  }, 500);

  // Pose switching on scroll
  let currentPose = "default";

  function setPose(pose) {
    if (currentPose === pose) return;
    currentPose = pose;
    img.classList.remove("rabbit-visible");
    img.classList.add("rabbit-bounce");
    setTimeout(() => {
      img.src = POSES[pose];
      img.classList.add("rabbit-visible");
    }, 160);
    setTimeout(() => img.classList.remove("rabbit-bounce"), 500);
  }

  [
    { selector: ".news-list",    pose: "news" },
    { selector: ".timeline",    pose: "background" },
    { selector: ".publications", pose: "publications" },
    { selector: ".post-title",  pose: "default" },
  ].forEach(({ selector, pose }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setPose(pose); }),
      { threshold: 0.3 }
    ).observe(el);
  });
})();
