document.addEventListener('DOMContentLoaded', function () {
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

  hamburgerButton?.addEventListener('click', function () {
    if (isHamburgerOpen()) closeHamburger();
    else openHamburger();
  });

  searchBar?.addEventListener('click', function () {
    if (isHamburgerOpen()) closeHamburger();
  });

  themeButton?.addEventListener('click', function () {
    if (!htmlElement) return;
    const currentTheme = htmlElement.className;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    htmlElement.className = newTheme;
  });
});
