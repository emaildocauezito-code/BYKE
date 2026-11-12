const bikeCarousel = document.querySelector('.bike-carousel');
const bikeImages = document.getElementById('bike-carousel-images');
const bikeControls = bikeCarousel.querySelector('.bike-carousel-controls');
const bikeStatus = bikeCarousel.querySelector('.bike-carousel-status');
const reducedCarouselMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

for (const model of models.slice(1)) {
  const image = new Image(1536, 1024);
  image.alt = model.imageAlt;
  image.setAttribute('aria-hidden', 'true');
  image.fetchPriority = 'low';
  image.src = model.image;
  bikeImages.append(image);
}

const bikeSlides = [...bikeImages.children];
let activeBike = 0;
let carouselTimer;
let pointerOverBike = false;

function scheduleBikeAdvance() {
  clearTimeout(carouselTimer);
  if (!document.hidden && !reducedCarouselMotion.matches && !pointerOverBike &&
      !bikeCarousel.querySelector(':focus-visible')) {
    carouselTimer = setTimeout(() => showBike(1), 5000);
  }
}

async function showBike(step, manual = false) {
  clearTimeout(carouselTimer);
  const nextBike = (activeBike + step + bikeSlides.length) % bikeSlides.length;
  const nextSlide = bikeSlides[nextBike];
  try {
    await nextSlide.decode();
  } catch {
    scheduleBikeAdvance();
    return;
  }
  if (activeBike === nextBike) return;

  bikeSlides[activeBike].classList.remove('bike-carousel-active');
  bikeSlides[activeBike].setAttribute('aria-hidden', 'true');
  nextSlide.classList.add('bike-carousel-active');
  nextSlide.removeAttribute('aria-hidden');
  activeBike = nextBike;
  if (manual) bikeStatus.textContent = models[activeBike].name;
  scheduleBikeAdvance();
}

bikeControls.addEventListener('click', event => {
  const button = event.target.closest('button[data-step]');
  if (button) showBike(Number(button.dataset.step), true);
});
bikeCarousel.addEventListener('pointerenter', event => {
  if (event.pointerType !== 'mouse') return;
  pointerOverBike = true;
  scheduleBikeAdvance();
});
bikeCarousel.addEventListener('pointerleave', () => {
  pointerOverBike = false;
  scheduleBikeAdvance();
});
bikeCarousel.addEventListener('focusin', scheduleBikeAdvance);
bikeCarousel.addEventListener('focusout', () => requestAnimationFrame(scheduleBikeAdvance));
document.addEventListener('visibilitychange', scheduleBikeAdvance);
reducedCarouselMotion.addEventListener('change', scheduleBikeAdvance);
bikeControls.hidden = false;
scheduleBikeAdvance();
