import { initMapAddress } from "./mapAddress";
import { initPickUp } from "./mapPickUp";
import { getElement } from "../assets";
import * as $ from "jquery";

const radioButtons = document.querySelectorAll(".delivery__radio");
const deliveryWindow = document.querySelectorAll(".delivery__options");
const shipping = getElement(".shipping");
const pickUpAddress = getElement(".pickupAddress__wrapper");
const pickUpAddressInput = getElement(".pickupAddress");
const select = getElement(".list__cities");
const toClear = document.querySelectorAll(".toClear");
const novaType = document.querySelectorAll(".novaType");
const addressType = document.querySelectorAll(".addressType");
const postMessage = getElement(".novaPost__message");

// listeners for delivery options

// hiding unnecessary fields
hide();
$(shipping).hide();
$(select).hide();
$(postMessage).hide();
$(pickUpAddress).hide();

function hide() {
  deliveryWindow.forEach((item) => {
    $(item).hide(300);
  });
}

function hideAndShow(button) {
  hide();
  $(button.parentElement.nextElementSibling).slideDown(300);
}

function clearInput() {
  toClear.forEach((input) => {
    input.value = "";
  });
}

// swapping needed fields with unneeded,
// clearing unneeded fields so they will not interfere with form data gathering
// shipping address is one block, only inputs are changing (groupped for courier and nova poshta)

radioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id == "pickUp") {
      clearInput();
      hideAndShow(button);
      $(select).hide();
      $(shipping).hide(300);
      initPickUp();
    } else if (button.id == "novaPost") {
      pickUpAddressInput.value = "";
      clearInput();
      hide();
      $(pickUpAddress).hide();
      $(shipping).show(300);
      addressType.forEach((item) => {
        $(item).hide(300);
      });
      novaType.forEach((item) => {
        $(item).show(300);
      });
    } else if (button.id == "courier") {
      pickUpAddressInput.value = "";
      clearInput();
      hideAndShow(button);
      $(pickUpAddress).hide();
      $(shipping).show(300);
      novaType.forEach((item) => {
        $(item).hide(300);
      });
      addressType.forEach((item) => {
        $(item).show(300);
      });
      initMapAddress();
    }
  });
});
