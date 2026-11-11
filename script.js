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
