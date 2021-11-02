import { getElement } from "../assets";

const errorMessage = getElement(".error-message");

export function showErrorMessage(message, element) {
  errorMessage.className = "error-message active";
  errorMessage.textContent = message;
  element.classList.add("error");
  element.focus();
}

export function removeError(element) {
  errorMessage.className = "error-message";
  element.classList.remove("error");
}

export const transformFirstLetter = (el) => {
  el.value = el.value[0].toLocaleUpperCase() + el.value.slice(1);
};
