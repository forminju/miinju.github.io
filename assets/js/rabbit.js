// Mouse-following rabbit mascot
(function () {
  const BASE = "/assets/img/me/";
  const POSES = {
    default:     BASE + "vi_rabbit.png",
    news:        BASE + "suprise_rabbit.png",
    background:  BASE + "think_rabbit.png",
    publications: BASE + "study_rabbit.png",
  };

  // Create rabbit element
  const rabbit = document.createElement("div");
  rabbit.id = "rabbit-mascot";
  rabbit.innerHTML = `<img id="rabbit-img" src="${POSES.default}" alt="" />`;
  document.body.appendChild(rabbit);

  const img = document.getElementById("rabbit-img");

  // Smooth follow position
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  const EASE = 0.08; // lower = more lag = more floaty

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * EASE;
    currentY += (mouseY - currentY) * EASE;

    // Offset so rabbit appears to the bottom-right of cursor
    rabbit.style.transform = `translate(${currentX + 16}px, ${currentY + 16}px)`;
    requestAnimationFrame(animate);
  }

  // Show rabbit after a short delay
  setTimeout(() => {
    img.classList.add("rabbit-visible");
    animate();
  }, 400);

  // Pose switching based on scroll section
  let currentPose = "default";

  function setPose(pose) {
    if (currentPose === pose) return;
    currentPose = pose;
    img.classList.remove("rabbit-visible");
    setTimeout(() => {
      img.src = POSES[pose];
      img.classList.add("rabbit-visible");
    }, 150);
  }

  const sections = [
    { selector: ".news-list",    pose: "news" },
    { selector: ".timeline",    pose: "background" },
    { selector: ".publications", pose: "publications" },
    { selector: ".post-title",  pose: "default" },
  ];

  sections.forEach(({ selector, pose }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setPose(pose); }),
      { threshold: 0.3 }
    ).observe(el);
  });
})();
