import "./styles/styles.scss";
import datepicker from "js-datepicker";
import * as $ from "jquery";
import "jquery-mask-plugin";

$(".phone").mask("+00 (000) 000 00 00");

$(".postal-code").mask("ZZZZZ", {
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

$(".card-exp").mask("ZZ / ZZZZ", {
  placeholder: "__/____",
  translation: {
    Z: {
      pattern: /[0-9]/,
    },
  },
});

$(".card-password").mask("ZZZ", {
  translation: {
    Z: {
      pattern: /[0-9]/,
    },
  },
});

$(".checkout-tip").mask("ZZZ.ZZZ.ZZZ,ZZ", {
  reverse: true,
  translation: {
    Z: {
      pattern: /[0-9]/,
    },
  },
});

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
datepicker(".date__start", { id: 1 });
datepicker(".date__end", { id: 1 });

const username = document.querySelector(".login__username");
const password = document.querySelector(".login__password");
const email = document.querySelector(".checkout-mail");
const firstName = document.querySelector(".first-name");
const lastName = document.querySelector(".last-name");
const postalCode = document.querySelector(".postal-code");
const phoneNumber = document.querySelector(".phone");
const cardNumber = document.querySelector(".card-number");
const cardFullName = document.querySelector(".card-full-name");
const cardExpiration = document.querySelector(".card-exp");
const cardCvv = document.querySelector(".card-password");
const tip = document.querySelector(".checkout-tip");
const url = document.querySelector(".checkout-url");
const filePhoto = document.querySelector(".checkout-file");
const form = document.querySelector(".checkout__form");
const errorMessage = document.querySelector(".error-message");

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

form.addEventListener("submit", (e) => {
  if (!email.validity.valid || email.value === "") {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter an e-mail";
  } else if (!firstName.validity.valid || firstName.value === "") {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter your name";
  } else if (!lastName.validity.valid || lastName.value === "") {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter your last name";
  } else if (!postalCode.validity.valid || postalCode.value === "") {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter a real postcode";
  } else if (!phoneNumber.validity.valid || phoneNumber.value === "") {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter a real phone number";
  } else if (!cardNumber.validity.valid || cardNumber.value === "") {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter your card number";
  } else if (!cardFullName.validity.valid || cardFullName.value === "") {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter the full name";
  } else if (!cardExpiration.validity.valid || cardExpiration.value === "") {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter the expiration date";
  } else if (!cardCvv.validity.valid || cardCvv.value === "") {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter a CVV number";
  } else if (!tip.validity.valid) {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please give us some money";
  } else if (!url.validity.valid) {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter an URL";
  } else if (!filePhoto.validity.valid) {
    e.preventDefault();
    errorMessage.className = "error-message active";
    errorMessage.textContent = `file must be no bigger then 1Mb`;
  }
});

email.addEventListener("input", function() {
  if (email.validity.typeMismatch) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter a valid email adress";
  } else if (email.value === "") {
    errorMessage.className = "error-message active";
    errorMessage.textContent = "Please enter an email";
  } else {
    email.setCustomValidity("");
    errorMessage.className = "error-message";
  }
});

firstName.addEventListener("input", function() {
  if (firstName.validity.tooShort) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter your real name, must be at least ${firstName.minLength} characters`;
  } else if (firstName.validity.tooLong) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Your name cannot have ${firstName.value} characters. Max is ${firstName.maxlength}`;
  } else {
    firstName.setCustomValidity("");

    errorMessage.className = "error-message";
  }
});

lastName.addEventListener("input", function() {
  if (lastName.validity.tooShort) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter your last name, must be at least ${lastName.minLength}`;
  } else if (lastName.validity.tooLong) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Your last name cannot be ${lastName.value}. Max is ${lastName.maxlength}`;
  } else {
    lastName.setCustomValidity("");

    errorMessage.className = "error-message";
  }
});

postalCode.addEventListener("input", function() {
  if (postalCode.validity.valueMissing) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter a real postcode`;
  } else if (postalCode.validity.tooLong) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Postcode must be not more then ${postalCode.maxlength}`;
  } else {
    postalCode.setCustomValidity("");

    errorMessage.className = "error-message";
  }
});

phoneNumber.addEventListener("input", function() {
  if (phoneNumber.validity.valueMissing) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter a real phone number`;
  } else if (phoneNumber.validity.tooShort) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter a valid phone number`;
  } else if (phoneNumber.validity.typeMismatch) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `This is not the phone number`;
  } else {
    phoneNumber.setCustomValidity("");

    errorMessage.className = "error-message";
  }
});

cardNumber.addEventListener("input", function() {
  if (cardNumber.validity.tooShort) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter more numbers`;
  } else if (cardNumber.validity.valueMissing) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter your card number`;
  } else {
    cardNumber.setCustomValidity("");

    errorMessage.className = "error-message";
  }
});

cardFullName.addEventListener("input", () => {
  if (cardFullName.validity.valueMissing) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter the full name `;
  } else {
    cardFullName.setCustomValidity("");

    errorMessage.className = "error-message";
  }
});

cardExpiration.addEventListener("input", () => {
  if (cardExpiration.validity.tooShort) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter a valid expiration date`;
  } else if (cardExpiration.validity.valueMissing) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter the expiration date`;
  } else {
    cardExpiration.setCustomValidity("");

    errorMessage.className = "error-message";
  }
});

cardCvv.addEventListener("input", () => {
  if (cardCvv.validity.tooShort) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter ${cardCvv.minLength} digits`;
  } else if (cardCvv.validity.valueMissing) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter a CVV number`;
  } else {
    cardCvv.setCustomValidity("");

    errorMessage.className = "error-message";
  }
});

tip.addEventListener("input", () => {
  if (tip.validity.valueMissing) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please give us some money`;
  } else if (tip.validity.tooShort) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Why so cheap? Only ${tip.value}?`;
  } else {
    tip.setCustomValidity("");

    errorMessage.className = "error-message";
  }
});

url.addEventListener("input", () => {
  if (url.validity.valueMissing) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `Please enter an URL`;
  } else if (url.validity.typeMismatch) {
    errorMessage.className = "error-message active";
    errorMessage.textContent = `This is not an URL`;
  } else {
    url.setCustomValidity("");

    errorMessage.className = "error-message";
  }
});
