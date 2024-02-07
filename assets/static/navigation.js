document.addEventListener("DOMContentLoaded", function () {
    const themeButton = document.querySelector("#theme-button");
    const htmlElement = document.querySelector("html");

    const hamburgerTop = document.querySelector("#hamburger-top");
    const hamburgerMiddle = document.querySelector("#hamburger-middle");
    const hamburgerBottom = document.querySelector("#hamburger-bottom");

    const hamburgerButton = document.querySelector("#hamburger-button");

    const searchBar = document.querySelector("#search-input");
  
    const sunIcon = document.querySelector("#theme-sun");
    const moonIcon = document.querySelector("#theme-moon");
  
    const savedTheme = localStorage.getItem("theme");
  
    if (savedTheme) {
      htmlElement.className = savedTheme;
    }
  
    if (savedTheme === "light") {
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    }

    hamburgerButton.addEventListener("click", function () {
      hamburgerTop.classList.toggle("rotate-45");
      hamburgerTop.classList.toggle("translate-x-[6.5px]");
      hamburgerTop.classList.toggle("-translate-y-[0.5px]");
      hamburgerMiddle.classList.toggle("hidden");
      hamburgerBottom.classList.toggle("-rotate-45");
      hamburgerBottom.classList.toggle("-translate-x-[7.5px]");
      hamburgerBottom.classList.toggle("translate-y-[6.5px]");
    });

    searchBar.addEventListener("click", function () {
      hamburgerTop.classList.remove("rotate-45");
      hamburgerTop.classList.remove("translate-x-[6.5px]");
      hamburgerTop.classList.remove("-translate-y-[0.5px]");
      hamburgerMiddle.classList.remove("hidden");
      hamburgerBottom.classList.remove("-rotate-45");
      hamburgerBottom.classList.remove("-translate-x-[7.5px]");
      hamburgerBottom.classList.remove("translate-y-[6.5px]");
    })

  
    themeButton.addEventListener("click", function () {
      const currentTheme = htmlElement.className;
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      htmlElement.className = newTheme;
    });
  });