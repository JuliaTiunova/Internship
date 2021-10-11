import "./styles/forms.scss";
import "./scripts/setupCart";

import { getElement } from "./scripts/assets";
import datepicker from "js-datepicker";
import * as $ from "jquery";
import "jquery-mask-plugin";
import "./scripts/burger";
import "./scripts/cart";

const loading = getElement(".page-loading");

const loginButton = getElement(".link-to-login");
const loginWindow = getElement(".login__window");
const loginClose = getElement(".login__button_close");

const username = getElement(".login__username");
const password = getElement(".login__password");
const email = getElement(".checkout-mail");
const firstName = getElement(".first-name");
const lastName = getElement(".last-name");
const adress = getElement(".adress");
const apartment = getElement(".apartment");
const postalCode = getElement(".postal-code");
const phoneNumber = getElement(".phone");
const cardNumber = getElement(".card-number");
const cardFullName = getElement(".card-full-name");
const cardExpiration = getElement(".card-exp");
const cardCvv = getElement(".card-password");
const tip = getElement(".checkout-tip");
const url = getElement(".checkout-url");
const filePhoto = getElement(".checkout-file");
const formLogin = getElement(".login__form");
const form = getElement(".checkout__form");
const errorMessage = getElement(".error-message");

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

$(".checkout__form").attr("autocomplete", "off");

datepicker(".date__delivery");
datepicker(".date__start", { id: 1 });
datepicker(".date__end", { id: 1 });

function showErrorMessage(message, element) {
  errorMessage.className = "error-message active";
  errorMessage.textContent = message;
  element.classList.add("error");
  element.focus();
}

function removeError(element) {
  errorMessage.className = "error-message";
  element.classList.remove("error");
}

const transformFirstLetter = (el) => {
  el.value = el.value[0].toLocaleUpperCase() + el.value.slice(1);
};

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

email.addEventListener("input", function() {
  let emailValue = email.value.split("@");
  let beforeDot;
  if (emailValue[1]) {
    beforeDot = emailValue[1].split(".");
  }

  if (email.value === "") {
    showErrorMessage("Please enter an e-mail", email);
  } else if (!emailValue[1] || !beforeDot[1] || beforeDot[1].length < 2) {
    showErrorMessage("Please enter a valid e-mail", email);
  } else {
    removeError(email);
  }
});

firstName.addEventListener("input", function() {
  let regExp = /^[a-zA-Z]+$/;

  if (firstName.value === "") {
    showErrorMessage("Please enter your name", firstName);
  } else if (firstName.validity.tooShort) {
    transformFirstLetter(firstName);
    showErrorMessage(
      `Please enter your real name, must be at least ${firstName.minLength} characters`,
      firstName
    );
  } else if (!regExp.test(firstName.value)) {
    transformFirstLetter(firstName);
    showErrorMessage(`Be sure to enter only letters`, firstName);
  } else {
    transformFirstLetter(firstName);
    removeError(firstName);
  }
});

lastName.addEventListener("input", function() {
  let regExp = /^[a-zA-Z]+$/;

  if (lastName.value === "") {
    showErrorMessage("Please enter your last name", lastName);
  }
  if (lastName.validity.tooShort) {
    transformFirstLetter(lastName);
    showErrorMessage(
      `Please enter your last name, must be at least ${lastName.minLength} characters`,
      lastName
    );
  } else if (!regExp.test(lastName.value)) {
    transformFirstLetter(lastName);
    showErrorMessage(`Be sure to enter only letters`, lastName);
  } else {
    transformFirstLetter(lastName);
    removeError(lastName);
  }
});

adress.addEventListener("input", function() {
  if (adress.value === "") {
    showErrorMessage(`Please enter an adress`);
  } else {
    removeError(adress);
  }
});

apartment.addEventListener("input", function() {
  if (apartment.value === "") {
    showErrorMessage(`Please enter an apartment`);
  } else {
    removeError(apartment);
  }
});

postalCode.addEventListener("input", function() {
  if (postalCode.value === "") {
    showErrorMessage(`Please enter a postcode`, postalCode);
  } else if (postalCode.validity.tooShort) {
    showErrorMessage(
      `Postcode must be at least ${postalCode.minLength} digits long`,
      postalCode
    );
  } else {
    removeError(postalCode);
  }
});

phoneNumber.addEventListener("input", function() {
  let phoneLength = phoneNumber.value
    .split("+")
    .join("")
    .split("(")
    .join("")
    .split(")")
    .join("")
    .split(" ")
    .join("");

  if (phoneNumber.value === "") {
    showErrorMessage(`Please enter a phone number`, phoneNumber);
  } else if (phoneLength.length < phoneNumber.minLength) {
    showErrorMessage(`Please enter a valid phone number`, phoneNumber);
  } else {
    removeError(phoneNumber);
  }
});

cardNumber.addEventListener("input", function() {
  let cardLength = cardNumber.value.split(" ").join("");
  if (cardNumber.value === "") {
    showErrorMessage("Please enter your card number", cardNumber);
  } else if (cardLength.length < cardNumber.minLength) {
    showErrorMessage(`Please enter more digits`, cardNumber);
  } else {
    removeError(cardNumber);
  }
});

cardFullName.addEventListener("input", () => {
  let nameLength = cardFullName.value.split(" ");
  let regExp = /^[a-zA-Z]+$/;

  if (cardFullName.value === "") {
    showErrorMessage(`Please enter the full name`, cardFullName);
  } else if (nameLength.length < 2) {
    cardFullName.value = cardFullName.value.toLocaleUpperCase();
    showErrorMessage(`Please enter the full name`, cardFullName);
  } else if (!regExp.test(cardFullName.value)) {
    cardFullName.value = cardFullName.value.toLocaleUpperCase();
    showErrorMessage(`Please enter your real name`, cardFullName);
  } else {
    cardFullName.value = cardFullName.value.toLocaleUpperCase();
    removeError(cardFullName);
  }
});

let date = new Date();
let dateYear = date.getFullYear();
let dateMonth = date.getMonth() + 1;

cardExpiration.addEventListener("input", () => {
  let separateDates = cardExpiration.value
    .split("/")
    .join("")
    .split("  ");
  let expLength = separateDates.join("");
  let month = separateDates[0];
  let year = separateDates[1];

  if (cardExpiration.value === "") {
    showErrorMessage(`Please enter the expiration date`, cardExpiration);
  } else if (expLength.length < cardExpiration.minLength) {
    showErrorMessage(`Please enter a valid expiration date`, cardExpiration);
  } else if (
    month > 12 ||
    month < 1 ||
    month < dateMonth ||
    year > 2100 ||
    year < dateYear
  ) {
    showErrorMessage(`Please enter a valid expiration date`, cardExpiration);
  } else {
    removeError(cardExpiration);
  }
});

cardCvv.addEventListener("input", () => {
  if (cardCvv.value === "") {
    showErrorMessage("Please enter a CVV number", cardCvv);
  } else if (cardCvv.value.length < cardCvv.minLength) {
    showErrorMessage("Please enter a CVV number", cardCvv);
  } else {
    removeError(cardCvv);
  }
});

tip.addEventListener("input", () => {
  let tipLength = tip.value.split(",").join("");
  if (tip.value === "") {
    showErrorMessage(`Please give us some money`, tip);
  } else if (tipLength.length < tip.minLength) {
    showErrorMessage(`Why so cheap? Only $0,${tip.value}?`, tip);
  } else {
    removeError(tip);
  }
});

url.addEventListener("input", () => {
  if (url.validity.typeMismatch) {
    showErrorMessage(`This is not an URL`, url);
  } else {
    removeError(url);
  }
});

filePhoto.addEventListener("change", () => {
  let allowed = new Array("jpg", "png", "gif", "jpeg");
  let fileExt = filePhoto.value
    .split(".")
    .pop()
    .toLowerCase();

  for (let i = 0; i <= allowed.length; i++) {
    if (allowed[i] !== fileExt) {
      showErrorMessage(`file must be a photo`, filePhoto);
    } else if (allowed[i] == fileExt) {
      removeError(filePhoto);
      return;
    }
  }

  if (filePhoto.value === "") {
    removeError(filePhoto);
  }
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(formLogin);
});

form.addEventListener("submit", (e) => {
  if (email.value === "") {
    e.preventDefault();
    showErrorMessage("Please enter an e-mail", email);
  } else if (email.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage("Please enter a valid e-mail", email);
  } else if (firstName.value === "") {
    e.preventDefault();
    showErrorMessage("Please enter your name", firstName);
  } else if (firstName.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage(`Please enter your real name`, firstName);
  } else if (lastName.value === "") {
    e.preventDefault();
    showErrorMessage(
      `Please enter your last name, must be at least ${lastName.minLength} characters`,
      lastName
    );
  } else if (lastName.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage(`Please check your last name`, lastName);
  } else if (adress.value === "") {
    e.preventDefault();
    showErrorMessage("Please enter an adress", adress);
  } else if (apartment.value === "") {
    e.preventDefault();
    showErrorMessage("Please enter an apartment", apartment);
  } else if (postalCode.value === "") {
    e.preventDefault();
    showErrorMessage("Please enter postcode", postalCode);
  } else if (postalCode.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage("Please enter a real postcode", postalCode);
  } else if (phoneNumber.value === "") {
    e.preventDefault();
    showErrorMessage(`Please enter a phone number`, phoneNumber);
  } else if (phoneNumber.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage(`Please enter a valid phone number`, phoneNumber);
  } else if (cardNumber.value === "") {
    e.preventDefault();
    showErrorMessage("Please enter your card number", cardNumber);
  } else if (cardNumber.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage(`Please enter more digits`, cardNumber);
  } else if (cardFullName.value === "") {
    e.preventDefault();
    showErrorMessage(`Please enter the full name`, cardFullName);
  } else if (cardFullName.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage(`Please enter the full name`, cardFullName);
  } else if (cardExpiration.value === "") {
    e.preventDefault();
    showErrorMessage("Please enter the expiration date", cardExpiration);
  } else if (cardExpiration.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage(`Please enter a valid expiration date`, cardExpiration);
  } else if (cardCvv.value === "") {
    e.preventDefault();
    showErrorMessage("Please enter a CVV number", cardCvv);
  } else if (cardCvv.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage("Please enter a CVV number", cardCvv);
  } else if (tip.value === "") {
    e.preventDefault();
    showErrorMessage(`Please give us some money`, tip);
  } else if (tip.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage(`Why so cheap? Only $${tip.value}?`, tip);
  } else if (url.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage("Please enter a valid URL", url);
  } else if (filePhoto.classList.contains("error")) {
    e.preventDefault();
    showErrorMessage(`file must be a photo`, filePhoto);
  } else {
    e.preventDefault();
    getData(form);
  }
});

function getData(form) {
  let data = {};
  let formInfo = new FormData(form);

  for (let [name, value] of formInfo) {
    data[name] = value;
  }

  let json = JSON.stringify(data);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.send(json);
  xhr.onload = () => console.log(json);
}

loading.style.display = "none";
