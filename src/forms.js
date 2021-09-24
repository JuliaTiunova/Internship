import "./styles/styles.scss";
import datepicker from "js-datepicker";
import * as $ from "jquery";
import "jquery-mask-plugin";

$(".phone").mask("+ZZ (ZZZ) ZZZ ZZ ZZ", {
  translation: {
    Z: {
      pattern: /[0-9]/,
    },
  },
});
$(".card-number").mask("ZZZZ ZZZZ ZZZZ ZZZZ", {
  translation: {
    Z: {
      pattern: /[0-9]/,
    },
  },
});
$(".card-exp").mask("00 / 0000");
$(".card-password").mask("ZZZ", {
  translation: {
    Z: {
      pattern: /[0-9]/,
    },
  },
});
$(".tip").mask("000.000.000,00", { reverse: true });

const burgerButton = document.querySelector(
  ".checkout__header .burger__button"
);
const burgerMenu = document.querySelector(".burger__menu");
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

const loginButton = document.querySelector(".link-to-login");
const loginWindow = document.querySelector(".login__window");
const loginClose = document.querySelector(".login__button_close");

loginButton.addEventListener("click", () => {
  loginWindow.classList.toggle("login_open");
});

loginClose.addEventListener("click", () => {
  loginWindow.classList.toggle("login_open");
});

datepicker(".date__delivery");
// datepicker(".date__exp");

const start = datepicker(".date__start", { id: 1 });
const end = datepicker(".date__end", { id: 1 });

console.log(start.getRange()); // undefined yet/
console.log(end.getRange());
