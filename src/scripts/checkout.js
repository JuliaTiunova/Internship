import "../styles/forms.scss";
import "./cart/setupCart";
import "./burger";
import "./cart";
import "./checkout/formListeners";
import "./checkout/loginListeners";
import "./checkout/cardListeners";
import "./checkout/infoListeners";
import "./checkout/masks";
import "./checkout/google";
import "./checkout/mapPickUp";
import "./checkout/mapNova";
import "./checkout/mapAddress";
import "./checkout/radioListeners";
import "./checkout/billing";
import * as $ from "jquery";

import { allCategoriesURL, getElement, getStorageItem } from "./assets";
import { displayMenu } from "./display/displayMenu";
import { displayCartItems } from "./checkout/displayCartItems";

let cart = getStorageItem("cart");

const loading = getElement(".page-loading");
const pickUpAddress = getElement(".pickupAddress__wrapper");
const checkoutWrapper = getElement(".checkout");

if (cart.length == 0) {
  checkoutWrapper.innerHTML = "working";
}

$(pickUpAddress).hide();

let categories = new XMLHttpRequest();
categories.open("GET", allCategoriesURL);
categories.responseType = "json";
categories.send();
categories.onload = function() {
  let result = categories.response;
  displayMenu(result);
  displayCartItems();
};

loading.style.display = "none";
