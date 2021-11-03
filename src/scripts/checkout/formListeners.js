import { getElement } from "../assets";
import { showErrorMessage } from "./errorMessage";
import { getData } from "./getDataForm";

const email = getElement(".checkout-mail");
const firstName = getElement(".first-name");
const lastName = getElement(".last-name");
const address = getElement(".address");
const apartment = getElement(".apartment");
const postalCode = getElement(".postal-code");
const phoneNumber = getElement(".phone");
const cardNumber = getElement(".card-number");
const cardFullName = getElement(".card-full-name");
const cardExpiration = getElement(".card-exp");
const cardCvv = getElement(".card-password");
const form = getElement(".checkout__form");

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
  } else if (address.value === "") {
    e.preventDefault();
    showErrorMessage("Please enter an address", address);
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
  } else {
    e.preventDefault();
    getData(form);
  }
});
