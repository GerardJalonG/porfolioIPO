document.addEventListener('DOMContentLoaded', () => {
  const scroller = document.querySelector('.tech_scroller');
  if (!scroller) return;

  const baseChildren = Array.from(scroller.children);
  const clones = baseChildren.map(n => n.cloneNode(true));
  clones.forEach(n => { n.setAttribute('aria-hidden', 'true'); });
  scroller.append(...clones);

  const baseWidth = baseChildren.reduce((w, el) => w + el.getBoundingClientRect().width, 0)
                    + (baseChildren.length - 1) * parseFloat(getComputedStyle(scroller).gap || 0);

  let raf = null;
  let speed = 0.5;  

  const step = () => {
    scroller.scrollLeft += speed;

    if (scroller.scrollLeft >= baseWidth) {
      scroller.scrollLeft -= baseWidth;
    }

    raf = requestAnimationFrame(step);
  };

  const start = () => { if (!raf) raf = requestAnimationFrame(step); };
  const stop  = () => { if (raf) cancelAnimationFrame(raf); raf = null; };

  scroller.addEventListener('mouseenter', () => { scroller.classList.add('is-hover'); stop(); });
  scroller.addEventListener('mouseleave', () => { scroller.classList.remove('is-hover'); start(); });

  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!media.matches) start();
});
