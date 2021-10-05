import { getElement } from "./assets";

const burgerButton = getElement(".burger__button");
const burgerMenu = getElement(".burger__menu");
const burgerLInk = document.querySelectorAll(".burger__item");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("menu_open");
  burgerMenu.classList.toggle("menu_open");
});

function closeMenu(el) {
  return el.addEventListener("click", () => {
    burgerButton.classList.toggle("menu_open");
    burgerMenu.classList.toggle("menu_open");
  });
}

burgerLInk.forEach((el) => closeMenu(el));
