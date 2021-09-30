export default function burger(button) {
  const burgerMenu = document.querySelector(".burger__menu");
  const burgerLInk = document.querySelectorAll(".burger__item");

  button.addEventListener("click", () => {
    button.classList.toggle("menu_open");
    burgerMenu.classList.toggle("menu_open");
  });

  function closeMenu(el) {
    return el.addEventListener("click", () => {
      button.classList.toggle("menu_open");
      burgerMenu.classList.toggle("menu_open");
    });
  }

  burgerLInk.forEach((el) => closeMenu(el));
}
