// Scroll-based rabbit character interaction
(function () {
  const POSES = {
    default: "/assets/img/me/vi_rabbit.png",
    news: "/assets/img/me/suprise_rabbit.png",
    background: "/assets/img/me/think_rabbit.png",
    publications: "/assets/img/me/study_rabbit.png",
  };

  // Only run on about/home page
  if (!document.querySelector(".news-list") && !document.querySelector(".timeline")) return;

  // Create rabbit container
  const container = document.createElement("div");
  container.id = "rabbit-mascot";
  container.innerHTML = `<img id="rabbit-img" src="${POSES.default}" alt="rabbit mascot" />`;
  document.body.appendChild(container);

  const img = document.getElementById("rabbit-img");
  let currentPose = "default";

  function setPose(pose) {
    if (currentPose === pose) return;
    currentPose = pose;
    img.classList.remove("rabbit-visible");
    setTimeout(() => {
      img.src = POSES[pose];
      img.classList.add("rabbit-visible");
    }, 180);
  }

  // Observe sections
  const observers = [
    { selector: ".news-list", pose: "news" },
    { selector: ".timeline", pose: "background" },
    { selector: ".publications", pose: "publications" },
  ];

  const observerOptions = { threshold: 0.3 };

  observers.forEach(({ selector, pose }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setPose(pose);
      });
    }, observerOptions);
    obs.observe(el);
  });

  // Reset to default when back at top
  const intro = document.querySelector(".post-title");
  if (intro) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setPose("default");
      });
    }, { threshold: 0.5 });
    obs.observe(intro);
  }

  // Initial visible
  setTimeout(() => img.classList.add("rabbit-visible"), 300);
})();
