document.addEventListener('DOMContentLoaded', () => {
  if (!window?.isPageLoaded)
    document.body.addEventListener('htmx:load', () => initializePage());
});

const initializePage = function () {
  const themeButton = document.querySelector('#theme-button');
  const htmlElement = document.querySelector('html');

  const hamburgerTop = document.querySelector('#hamburger-top');
  const hamburgerMiddle = document.querySelector('#hamburger-middle');
  const hamburgerBottom = document.querySelector('#hamburger-bottom');

  const hamburgerButton = document.querySelector('#hamburger-button');

  const searchBar = document.querySelector('#search-input');

  const sunIcon = document.querySelector('#theme-sun');
  const moonIcon = document.querySelector('#theme-moon');

  const savedTheme = localStorage.getItem('theme');

  const navDropdownOverlay = document.getElementById('nav-dropdown-overlay');
  const navDropdown = document.getElementById('nav-dropdown');

  if (savedTheme && htmlElement) {
    htmlElement.className = savedTheme;
  }

  if (savedTheme === 'light') {
    if (!sunIcon || !moonIcon) return;
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    if (!sunIcon || !moonIcon) return;
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }

  const closeHamburger = function () {
    if (!hamburgerTop || !hamburgerMiddle || !hamburgerBottom) return;
    hamburgerTop.classList.remove('rotate-45');
    hamburgerTop.classList.remove('translate-x-[6.5px]');
    hamburgerTop.classList.remove('-translate-y-[0.5px]');
    hamburgerMiddle.classList.remove('hidden');
    hamburgerBottom.classList.remove('-rotate-45');
    hamburgerBottom.classList.remove('-translate-x-[7.5px]');
    hamburgerBottom.classList.remove('translate-y-[6.5px]');
  };

  const openHamburger = function () {
    if (!hamburgerTop || !hamburgerMiddle || !hamburgerBottom) return;
    hamburgerTop.classList.add('rotate-45');
    hamburgerTop.classList.add('translate-x-[6.5px]');
    hamburgerTop.classList.add('-translate-y-[0.5px]');
    hamburgerMiddle.classList.add('hidden');
    hamburgerBottom.classList.add('-rotate-45');
    hamburgerBottom.classList.add('-translate-x-[7.5px]');
    hamburgerBottom.classList.add('translate-y-[6.5px]');
  };

  const isHamburgerOpen = function () {
    if (!hamburgerTop) return false;
    return hamburgerTop.classList.contains('rotate-45');
  };

  const closeModal = function () {
    if (!navDropdownOverlay || !navDropdown) return;

    const intervalId = setInterval(() => {
      navDropdownOverlay.style.opacity = `${parseFloat(navDropdownOverlay.style.opacity) - 0.03}`;
      if (parseFloat(navDropdownOverlay.style.opacity) <= 0) {
        navDropdownOverlay.style.opacity = '0';
        clearInterval(intervalId);
        navDropdownOverlay.classList.add('hidden');
      }
    }, 15);

    setTimeout(() => {
      navDropdownOverlay.classList.add('hidden');
    }, 300);
  };

  const openModal = function () {
    if (!navDropdownOverlay || !navDropdown) return;

    navDropdownOverlay.classList.remove('hidden');
    navDropdownOverlay.style.opacity = '0';
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        navDropdownOverlay.style.opacity = `${i * 0.03}`;
      }, i * 15);
    }
  };

  const isModalOpen = function () {
    if (!navDropdownOverlay) return false;
    return !navDropdownOverlay.classList.contains('hidden');
  };

  const handleModal = function () {
    if (isModalOpen()) {
      closeModal();
    } else {
      openModal();
    }
  };

  const hambuergerClick = function () {
    if (isHamburgerOpen()) {
      closeHamburger();
      handleModal();
    } else {
      openHamburger();
      handleModal();
    }
  };

  hamburgerButton?.addEventListener('click', hambuergerClick);
  navDropdownOverlay?.addEventListener('click', hambuergerClick);

  const searchClick = function () {
    if (isHamburgerOpen()) {
      closeHamburger();
      closeModal();
    }
  };

  searchBar?.addEventListener('click', searchClick);

  const themeClick = function () {
    if (!htmlElement) return;
    const currentTheme = htmlElement.className;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    htmlElement.className = newTheme;
  };

  themeButton?.addEventListener('click', themeClick);

  window.isPageLoaded = true;
};
