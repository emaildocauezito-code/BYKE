const legacyPlan = new URLSearchParams(window.location.search);
if (legacyPlan.has('plano') || legacyPlan.has('modelo')) {
  window.location.replace(`planos.html?${legacyPlan}#opcoes`);
}

// Add the final MP4 paths here in playback order.
const motionClips = [];
const showcase = document.querySelector('.motion-showcase');
const motionVideo = showcase.querySelector('video');
const motionToggle = showcase.querySelector('button');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let clipIndex = 0;
let failedClips = 0;
let inView = false;
let wantsPlayback = !motionPreference.matches;

function syncMotionPlayback() {
  if (inView && wantsPlayback) {
    motionVideo.play().catch(() => {});
  } else {
    motionVideo.pause();
  }
}

function nextMotionClip() {
  clipIndex = (clipIndex + 1) % motionClips.length;
  motionVideo.src = motionClips[clipIndex];
  syncMotionPlayback();
}

if (motionClips.length) {
  motionToggle.hidden = false;
  motionVideo.addEventListener('playing', () => {
    failedClips = 0;
    motionVideo.classList.add('is-visible');
    motionToggle.textContent = 'Pausar vídeos';
  });
  motionVideo.addEventListener('pause', () => {
    motionToggle.textContent = 'Reproduzir vídeos';
  });
  motionVideo.addEventListener('ended', nextMotionClip);
  motionVideo.addEventListener('error', () => {
    if (++failedClips < motionClips.length) {
      nextMotionClip();
    } else {
      motionVideo.classList.remove('is-visible');
      motionToggle.hidden = true;
    }
  });
  motionToggle.addEventListener('click', () => {
    wantsPlayback = motionVideo.paused;
    syncMotionPlayback();
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) {
      wantsPlayback = false;
      syncMotionPlayback();
    }
  });
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView && !motionVideo.hasAttribute('src')) motionVideo.src = motionClips[0];
    syncMotionPlayback();
  }, { threshold: 0.45 }).observe(showcase);
}

const heroMedia = document.querySelector('.home-hero-media');
if (heroMedia) {
  const photo = heroMedia.querySelector('img');
  const slides = [photo, ...heroMedia.querySelectorAll('video')];
  const previous = heroMedia.querySelector('.home-hero-arrow--prev');
  const next = heroMedia.querySelector('.home-hero-arrow--next');
  let activeIndex = 0;
  let photoTimer;
  let selection = 0;

  function showSlide(index, advance = true) {
    clearTimeout(photoTimer);
    const currentSelection = ++selection;
    const oldSlide = slides[activeIndex];
    if (oldSlide !== photo) {
      oldSlide.pause();
      oldSlide.hidden = true;
    }
    photo.removeAttribute('aria-hidden');
    activeIndex = (index + slides.length) % slides.length;
    const slide = slides[activeIndex];
    if (slide === photo) {
      if (advance && !motionPreference.matches) {
        photoTimer = setTimeout(() => showSlide(1), 3000);
      }
      return;
    }
    slide.currentTime = 0;
    slide.play().catch(() => {
      if (selection === currentSelection) showSlide(0, false);
    });
  }

  for (const video of slides.slice(1)) {
    video.addEventListener('playing', () => {
      if (slides[activeIndex] !== video || video.paused) return;
      video.hidden = false;
      photo.setAttribute('aria-hidden', 'true');
    });
    video.addEventListener('ended', () => {
      if (slides[activeIndex] === video) {
        showSlide(motionPreference.matches ? 0 : activeIndex + 1);
      }
    });
    video.addEventListener('error', () => {
      if (slides[activeIndex] === video) showSlide(0, false);
    });
  }
  previous.hidden = false;
  next.hidden = false;
  previous.addEventListener('click', () => showSlide(activeIndex - 1));
  next.addEventListener('click', () => showSlide(activeIndex + 1));
  motionPreference.addEventListener('change', () => showSlide(0));
  showSlide(0);
}
