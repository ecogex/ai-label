document.addEventListener('DOMContentLoaded', function () {
  if (typeof inView !== 'function') {
    return;
  }

  const sectionIds = ['no-ai', 'assisted-ai', 'with-ai'];
  const links = Array.from(document.querySelectorAll('.logo a[href^="#"]'));

  if (links.length === 0) {
    return;
  }

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sections.length === 0) {
    return;
  }

  function clearActive() {
    links.forEach((a) => a.classList.remove('is-active'));
  }

  function setActiveById(id) {
    clearActive();
    const a = document.querySelector(`.logo a[href="#${id}"]`);
    if (a) {
      a.classList.add('is-active');
    }
  }

  function setFirstVisibleActive() {
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && inView.is(el)) {
        setActiveById(id);
        return;
      }
    }
    clearActive();
  }

  inView.offset({
    top: window.innerHeight * 0.35,
    bottom: window.innerHeight * 0.35,
  });

  inView(sections.map((el) => `#${el.id}`).join(', '))
    .on('enter', (el) => {
      if (el && el.id) {
        setActiveById(el.id);
      }
    })
    .on('exit', (el) => {
      const active = document.querySelector('.logo a.is-active');
      if (!active) {
        setFirstVisibleActive();
        return;
      }

      if (el && active.getAttribute('href') === `#${el.id}`) {
        setFirstVisibleActive();
      }
    });

  setFirstVisibleActive();

  // glow-bouton download ici
  const glowEl = document.querySelector('.glow');
  const downloadLink = document.querySelector('.download-link');

  if (glowEl && downloadLink) {
    inView('.glow')
      .on('enter', () => {
        downloadLink.classList.add('is-glow');
      })
      .on('exit', () => {
        downloadLink.classList.remove('is-glow');
      });
  }
});
