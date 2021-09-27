export default function burger() {
  const burgerButton = document.querySelector(".burger__button");
  const burgerMenu = document.querySelector(".burger__menu");
  const burgerLInk = document.querySelectorAll(".burger__item");

  burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("menu_open");
    burgerMenu.classList.toggle("menu_open");
  });

  function closeMenu(el) {
    el.addEventListener("click", () => {
      burgerButton.classList.toggle("menu_open");
      burgerMenu.classList.toggle("menu_open");
    });
  }
  burgerLInk.forEach((el) => closeMenu(el));
}
