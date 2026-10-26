/* eslint-env browser */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
}

function initNavigation() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!toggle || !menu) return;

  const setMenuIcon = (name) => {
    const current = toggle.querySelector('svg, i');
    if (!current) return;
    const icon = document.createElement('i');
    icon.dataset.lucide = name;
    current.replaceWith(icon);
    initIcons();
  };

  const close = (restoreFocus = false) => {
    if (!menu.classList.contains('open')) return;
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-label', 'Abrir menú');
    document.querySelectorAll('main, .site-footer').forEach((node) => { node.inert = false; });
    setMenuIcon('menu');
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.querySelectorAll('main, .site-footer').forEach((node) => { node.inert = open; });
    setMenuIcon(open ? 'x' : 'menu');
    if (open) setTimeout(() => menu.querySelector('a')?.focus(), 0);
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => close()));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close(true);
    if (event.key !== 'Tab' || !menu.classList.contains('open')) return;
    const links = [...menu.querySelectorAll('a')];
    const first = links[0];
    const last = links[links.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      toggle.focus();
    } else if (event.shiftKey && document.activeElement === toggle) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      toggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) close();
  });
}

function initActiveNavigation() {
  const page = document.body.dataset.page || 'home';
  document.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => link.setAttribute('aria-current', 'page'));
}

const demoContent = {
  custom: {
    eyebrow: 'A tu manera',
    title: 'Tu actividad, campo a campo',
    text: 'Elige el nombre, los detalles, las imágenes y los enlaces. Revisa la vista previa antes de aplicar los cambios.',
    points: ['Imágenes propias o externas', 'Hasta dos botones', 'Tiempo transcurrido o progreso'],
    label: 'Jugando', name: 'PresenceX Studio', details: 'Creando una presencia', state: 'Ajustando los últimos detalles', icon: 'sparkles', color: '#5865f2', small: 'wand-sparkles'
  },
  games: {
    eyebrow: 'Catálogo integrado',
    title: 'Tu juego, listo en segundos',
    text: 'Busca un título en los catálogos de Xbox y Nintendo y aplícalo manualmente. No necesitas vincular una consola.',
    points: ['Búsqueda rápida', 'Imágenes preparadas para Discord', 'Presets reutilizables'],
    label: 'Jugando', name: 'The Legend of Zelda', details: 'Explorando Hyrule', state: 'Nintendo Switch', icon: 'gamepad-2', color: '#34d399', small: 'joystick'
  },
  media: {
    eyebrow: 'Media RPC',
    title: 'La reproducción va contigo',
    text: 'Comparte título, artista, carátula y tiempo desde un reproductor compatible, sin cambiar tu estado básico de Discord.',
    points: ['Cambios de pista automáticos', 'Información del reproductor', 'Control desde Crear'],
    label: 'Escuchando', name: 'YouTube Music', details: 'MIDDLE OF THE NIGHT', state: 'Elley Duhé', icon: 'music-2', color: '#ed4245', small: 'play'
  },
  apps: {
    eyebrow: 'Apps RPC',
    title: 'Solo las apps que tú elijas',
    text: 'Selecciona tus aplicaciones, activa la detección y PresenceX actualizará la actividad cuando una de ellas pase a primer plano.',
    points: ['Selección por aplicación', 'Detección del primer plano', 'Control total desde Crear'],
    label: 'Jugando', name: 'Minecraft', details: 'Jugando en Android', state: 'Apps RPC', icon: 'smartphone', color: '#22b8e6', small: 'gamepad-2'
  }
};

function initDemo() {
  const tabs = [...document.querySelectorAll('[data-demo-tab]')];
  const stage = document.querySelector('[data-demo-stage]');
  if (!tabs.length || !stage) return;
  stage.id = 'presence-preview';
  stage.setAttribute('role', 'tabpanel');
  stage.tabIndex = 0;
  tabs.forEach((tab) => {
    tab.id = `presence-tab-${tab.dataset.demoTab}`;
    tab.setAttribute('aria-controls', stage.id);
  });

  const render = (key) => {
    const item = demoContent[key];
    if (!item) return;
    const selectedTab = tabs.find((tab) => tab.dataset.demoTab === key);
    tabs.forEach((tab) => {
      const selected = tab === selectedTab;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    if (selectedTab) stage.setAttribute('aria-labelledby', selectedTab.id);
    stage.innerHTML = `
      <div class="demo-stage-copy">
        <p class="eyebrow eyebrow-light">${item.eyebrow}</p>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <ul class="demo-points">${item.points.map((point) => `<li><i data-lucide="check-circle-2"></i>${point}</li>`).join('')}</ul>
      </div>
      <div class="activity-preview" aria-label="Vista previa de Rich Presence">
        <div class="activity-label">${item.label}</div>
        <div class="activity-main">
          <div class="activity-art activity-art-${key}"><i data-lucide="${item.icon}"></i><span class="activity-small"><i data-lucide="${item.small}"></i></span></div>
          <div class="activity-copy"><strong>${item.name}</strong><span>${item.details}</span><span>${item.state}</span><span>02:16 transcurridos</span></div>
        </div>
        <div class="progress"><span></span></div><div class="activity-time"><span>1:48</span><span>4:23</span></div>
      </div>`;
    initIcons();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => render(tab.dataset.demoTab));
    tab.addEventListener('keydown', (event) => {
      const index = tabs.indexOf(tab);
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        const next = tabs[(index + 1) % tabs.length];
        next.focus();
        render(next.dataset.demoTab);
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        const previous = tabs[(index - 1 + tabs.length) % tabs.length];
        previous.focus();
        render(previous.dataset.demoTab);
      }
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        const target = event.key === 'Home' ? tabs[0] : tabs[tabs.length - 1];
        target.focus();
        render(target.dataset.demoTab);
      }
    });
  });

  render(tabs.find((tab) => tab.getAttribute('aria-selected') === 'true')?.dataset.demoTab || tabs[0].dataset.demoTab);
}

function initFaq() {
  document.querySelectorAll('.faq-question').forEach((button, index) => {
    const answer = button.closest('.faq-item')?.querySelector('.faq-answer');
    if (!answer) return;
    answer.id = `faq-answer-${index + 1}`;
    answer.hidden = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-controls', answer.id);
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      answer.hidden = !open;
    });
  });
}

function initReveal() {
  const nodes = document.querySelectorAll('.reveal');
  if (!nodes.length || prefersReducedMotion || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  nodes.forEach((node) => observer.observe(node));
}

function initYear() {
  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });
}

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initNavigation();
  initActiveNavigation();
  initDemo();
  initFaq();
  initReveal();
  initYear();
});
