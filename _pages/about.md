---
layout: about
title: about
permalink: /
subtitle: "<a href='https://www.hanyang.ac.kr/' target='_blank'>Hanyang University</a> · <a href='https://sites.google.com/view/hyu-mm/home' target='_blank'>Multimodal AI Lab</a> · AI Researcher"

profile:
  align: right
  image: "me/me.jpg"
  image_circular: false
selected_papers: true
social: true
---

<div class="fade-in" style="--delay: 0s">

Hi, I'm MinJu Jeon — a Master's student in Data Science at Hanyang University, currently a Research Intern at Naver Cloud(Voice Tech).

I work on problems at the intersection of language and perception: multilingual speech (G2P/TTS), video-language understanding, and the messy data work that makes models actually usable in production. 

</div>

<div class="fade-in interests" style="--delay: 0.15s">
  <span class="badge">Multimodal Learning</span>
  <span class="badge">Video-Text Retrieval</span>
  <span class="badge">Speech &amp; Language</span>
  <span class="badge">Data-Centric AI</span>
</div>

---

### News

<div class="news-list fade-in" style="--delay: 0.3s">
  <div class="news-item"><span class="news-date">Mar 2026</span><span class="news-text"><strong>Cap4Bridge</strong> accepted at <strong>IEEE Access 2026</strong></span></div>
  <div class="news-item"><span class="news-date">Feb 2026</span><span class="news-text">Two papers accepted at <strong>CVPR 2026</strong></span></div>
  <div class="news-item"><span class="news-date">Dec 2025</span><span class="news-text">Started research internship at <strong>Naver Cloud</strong>, Voice Tech Team</span></div>
  <div class="news-item"><span class="news-date">Aug 2025</span><span class="news-text"><strong>Sali4Vid</strong> accepted at <strong>EMNLP 2025</strong> (Long, Main)</span></div>
</div>

---

### Background

<div class="timeline fade-in" style="--delay: 0.45s">
  <div class="tl-item">
    <div class="tl-left">Dec 2025 – Present</div>
    <div class="tl-right"><strong>Research Intern</strong>, Naver Cloud · Voice Tech Team<br><span class="tl-sub">Multilingual G2P &amp; robust TTS for non-canonical text</span></div>
  </div>
  <div class="tl-item">
    <div class="tl-left">Sep 2024 – Present</div>
    <div class="tl-right"><strong>M.S. in Data Science</strong>, Hanyang University</div>
  </div>
  <div class="tl-item">
    <div class="tl-left">Mar 2020 – Aug 2024</div>
    <div class="tl-right"><strong>B.S. in Industrial Engineering</strong>, Hanyang University</div>
  </div>
</div>

<style>
  .interests {
    margin: 1rem 0 1.5rem;
  }

  .news-list {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    margin-top: 0.75rem;
  }
  .news-item {
    display: flex;
    align-items: baseline;
    gap: 1.1rem;
    font-size: 0.92rem;
  }
  .news-date {
    color: var(--global-theme-color);
    font-weight: 600;
    white-space: nowrap;
    min-width: 5.25rem;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .news-text {
    color: var(--global-text-color);
    line-height: 1.55;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0.95rem;
    margin-top: 0.75rem;
  }
  .tl-item {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }
  .tl-left {
    min-width: 9.5rem;
    color: var(--global-theme-color);
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding-top: 0.2rem;
    white-space: nowrap;
  }
  .tl-right {
    font-size: 0.92rem;
    line-height: 1.6;
  }
  .tl-sub {
    font-size: 0.82rem;
    color: var(--global-text-color-light, #888);
  }

  @media (max-width: 576px) {
    .news-item,
    .tl-item {
      flex-direction: column;
      gap: 0.15rem;
    }
    .news-date,
    .tl-left {
      min-width: 0;
    }
  }
</style>