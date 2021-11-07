import { getElement } from "../assets";
import { removeError, showErrorMessage } from "./errorMessage";

//form validation for billing section

const cardNumber = getElement(".card-number");
const cardFullName = getElement(".card-full-name");
const cardExpiration = getElement(".card-exp");
const cardCvv = getElement(".card-password");

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
  let regExp = /^[a-zA-Z\s]+$/;
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

cardExpiration.addEventListener("input", () => {
  let date = new Date();
  let dateYear = date.getFullYear();
  let dateMonth = date.getMonth() + 1;

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
