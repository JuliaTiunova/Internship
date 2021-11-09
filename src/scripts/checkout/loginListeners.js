import { getElement } from "../assets";
import { getData } from "./getDataForm";

const loginButton = getElement(".link-to-login");
const loginWindow = getElement(".login__window");
const loginClose = getElement(".login__button_close");
const username = getElement(".login__username");
const password = getElement(".login__password");
const formLogin = getElement(".login__form");

// login form validation

loginButton.addEventListener("click", () => {
  loginWindow.classList.toggle("login_open");
});

loginClose.addEventListener("click", () => {
  loginWindow.classList.toggle("login_open");
});

username.addEventListener("input", () => {
  if (username.validity.valueMissing) {
    username.setCustomValidity(`Please enter a username`);
  } else if (username.validity.tooShort) {
    username.setCustomValidity(
      `Please enter a valid username, unless your name is "${username.value}"`
    );
  } else {
    username.setCustomValidity("");
  }
});

password.addEventListener("input", () => {
  if (password.validity.valueMissing) {
    password.setCustomValidity(`Please enter a password`);
  } else if (password.validity.tooShort) {
    password.setCustomValidity(
      `The password should have at least ${password.minLength} characters, you've entered "${password.value.length}"`
    );
  } else {
    password.setCustomValidity("");
  }
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(formLogin);
});
