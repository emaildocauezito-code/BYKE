(() => {
  const carousel = document.querySelector('.bike-carousel');
  const stage = document.getElementById('bike-carousel-images');
  const controls = carousel.querySelector('.bike-carousel-controls');
  const picker = carousel.querySelector('.bike-model-picker');
  const status = carousel.querySelector('.bike-carousel-status');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const name = document.getElementById('bike-preview-name');
  const type = document.getElementById('bike-preview-type');
  let active = 0;
  let request = 0;
  let frame;

  models.slice(1).forEach(model => {
    const img = new Image(1536, 1024);
    img.alt = model.imageAlt;
    img.setAttribute('aria-hidden', 'true');
    img.src = model.image;
    stage.append(img);
  });
  const images = [...stage.children];

  async function selectBike(index) {
    const token = ++request;
    const next = (index + images.length) % images.length;
    try { await images[next].decode(); } catch { return; }
    if (token !== request || next === active) return;
    images.forEach((img, i) => {
      img.classList.toggle('bike-carousel-active', i === next);
      img.setAttribute('aria-hidden', String(i !== next));
    });
    active = next;
    picker.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === active)));
    name.textContent = models[active].name;
    type.textContent = { ESPORTIVA: 'Esportiva', URBANA: 'Urbana', CROSS: 'Cross' }[models[active].tag];
    carousel.querySelector('.bike-preview-index').textContent = `0${active + 1} / 03`;
    status.textContent = `${models[active].name}, ${type.textContent.toLowerCase()}`;
  }
  controls.addEventListener('click', event => {
    const button = event.target.closest('[data-step]');
    if (button) selectBike(active + Number(button.dataset.step));
  });
  picker.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => selectBike(Number(button.dataset.bike)));
    button.addEventListener('pointerenter', event => {
      if (finePointer.matches && event.pointerType === 'mouse') selectBike(Number(button.dataset.bike));
    });
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? 2 :
        (Number(button.dataset.bike) + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
      picker.querySelector(`[data-bike="${index}"]`).focus();
      selectBike(index);
    });
  });
  stage.addEventListener('pointerenter', event => {
    if (finePointer.matches && event.pointerType === 'mouse') selectBike(active + 1);
  });
  stage.addEventListener('pointermove', event => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType !== 'mouse') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = stage.getBoundingClientRect();
      stage.style.setProperty('--bike-x', `${((event.clientX - rect.left) / rect.width - .5) * 14}px`);
      stage.style.setProperty('--bike-y', `${((event.clientY - rect.top) / rect.height - .5) * 10 - 5}px`);
    });
  });
  function resetPosition() {
    cancelAnimationFrame(frame);
    stage.style.setProperty('--bike-x', '0px');
    stage.style.setProperty('--bike-y', '0px');
  }
  stage.addEventListener('pointerleave', resetPosition);
  reducedMotion.addEventListener('change', resetPosition);
  controls.hidden = false;
  picker.hidden = false;
  carousel.querySelector('.bike-pointer-hint').hidden = false;

  // Normal document scrolling; the observer only reveals each element once.
  const targets = [...document.querySelectorAll('.detail-model-image, .detail-model-copy, .quiz-invite, #comparar .detail-heading, .comparison-table, .detail-bottom-cta')];
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    targets.forEach(target => {
      if (target.getBoundingClientRect().top < innerHeight) return;
      target.classList.add('motion-reveal');
      observer.observe(target);
    });
    const revealAnchor = () => {
      const id = location.hash.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      [target, ...target.querySelectorAll('.motion-reveal')].forEach(item => {
        item.classList.add('is-revealed');
        observer.unobserve(item);
      });
    };
    addEventListener('hashchange', revealAnchor);
    revealAnchor();
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        targets.forEach(target => target.classList.add('is-revealed'));
        observer.disconnect();
      }
    });
  }
})();
