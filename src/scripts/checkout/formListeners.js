import { getElement } from "../assets";
import { removeError, showErrorMessage } from "./errorMessage";
import { getData } from "./getDataForm";

const errorRemoval = document.querySelectorAll(".errorRemoval");
const shops = document.querySelectorAll(".shop__wrapper");
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
const novaNumber = getElement(".novaPost");
const city = getElement(".city");
const pickUpAdress = getElement(".pickupAddress");
const warehouse = getElement("#warehouse");

const pickUp = getElement("#pickUp");
const novaPost = getElement("#novaPost");
const courier = getElement("#courier");

const cash = getElement("#cash");
const credit = getElement("#credit");

// remove error class from inputs after autocomplete

warehouse.onclick = () => {
  errorRemoval.forEach((item) => {
    removeError(item);
  });
};

shops.forEach((shop) => {
  shop.addEventListener("click", () => {
    removeError(pickUpAdress);
  });
});

function prevAndMessage(e, message, element) {
  e.preventDefault();
  showErrorMessage(message, element);
}

// card validation on form submit

function checkCard(e) {
  if (cardNumber.value === "") {
    prevAndMessage(e, "Please enter your card number", cardNumber);
  } else if (cardNumber.classList.contains("error")) {
    prevAndMessage(e, `Please enter more digits`, cardNumber);
  } else if (
    cardFullName.value === "" ||
    cardFullName.classList.contains("error")
  ) {
    prevAndMessage(e, `Please enter the full name`, cardFullName);
  } else if (cardExpiration.value === "") {
    prevAndMessage(e, "Please enter the expiration date", cardExpiration);
  } else if (cardExpiration.classList.contains("error")) {
    prevAndMessage(e, `Please enter a valid expiration date`, cardExpiration);
  } else if (cardCvv.value === "" || cardCvv.classList.contains("error")) {
    prevAndMessage(e, "Please enter a CVV number", cardCvv);
  } else {
    e.preventDefault();
    getData(form);
  }
}

form.addEventListener("submit", (e) => {
  if (firstName.value === "") {
    prevAndMessage(e, "Please enter your name", firstName);
  } else if (firstName.classList.contains("error")) {
    prevAndMessage(e, `Please enter your real name`, firstName);
  } else if (lastName.value === "") {
    prevAndMessage(
      e,
      `Please enter your last name, must be at least ${lastName.minLength} characters`,
      lastName
    );
  } else if (lastName.classList.contains("error")) {
    prevAndMessage(e, `Please check your last name`, lastName);
  } else if (email.value === "") {
    prevAndMessage(e, "Please enter an e-mail", email);
  } else if (email.classList.contains("error")) {
    prevAndMessage(e, "Please enter a valid e-mail", email);
  } else if (phoneNumber.value === "") {
    prevAndMessage(e, `Please enter a phone number`, phoneNumber);
  } else if (phoneNumber.classList.contains("error")) {
    prevAndMessage(e, `Please enter a valid phone number`, phoneNumber);
  } else if (!pickUp.checked && !novaPost.checked && !courier.checked) {
    prevAndMessage(e, "Please choose a delivery method");
    phoneNumber.scrollIntoView();
  } else if (!cash.checked && !credit.checked) {
    prevAndMessage(e, "Please choose payment method");
    document.querySelector(".payment").scrollIntoView();
  } else if (pickUp.checked && cash.checked) {
    if (pickUpAdress.value === "") {
      prevAndMessage(e, "Please choose a pickup store", pickUpAdress);
      document.querySelector(".stores").scrollIntoView();
    } else {
      e.preventDefault();
      getData(form);
    }
  } else if (pickUp.checked && credit.checked) {
    checkCard(e);
  } else if (novaPost.checked) {
    if (novaNumber.value === "" || novaNumber.classList.contains("error")) {
      prevAndMessage(e, "Please enter Nova Poshta number", novaNumber);
    } else if (address.value === "") {
      prevAndMessage(e, "Please enter an address", address);
    } else if (city.value === "") {
      prevAndMessage(e, "Please enter a city name", city);
    } else if (credit.checked) {
      checkCard(e);
    } else {
      e.preventDefault();
      getData(form);
    }
  } else if (courier.checked) {
    if (address.value === "") {
      prevAndMessage(e, "Please enter an address", address);
    } else if (apartment.value === "") {
      prevAndMessage(e, "Please enter an apartment", apartment);
    } else if (postalCode.value === "") {
      prevAndMessage(e, "Please enter postcode", postalCode);
    } else if (postalCode.classList.contains("error")) {
      prevAndMessage(e, "Please enter a real postcode", postalCode);
    } else if (credit.checked) {
      checkCard(e);
    } else {
      e.preventDefault();
      getData(form);
    }
  }
});
