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

import { allCategoriesURL, getElement, getStorageItem } from "./assets";
import { displayMenu } from "./display/displayMenu";
import { displayCartItems } from "./checkout/displayCartItems";
import message from "../templates/checkoutEmptyCart.handlebars";

let cart = getStorageItem("cart");

const loading = getElement(".page-loading");
const checkoutWrapper = getElement(".checkout");

// get categories for head menu
let categories = new XMLHttpRequest();
categories.open("GET", allCategoriesURL);
categories.responseType = "json";
categories.send();
categories.onload = function() {
  let result = categories.response;
  displayMenu(result);
  if (cart.length != 0) {
    displayCartItems();
  } else {
    // display message if the cart is empty
    checkoutWrapper.innerHTML = message();
  }
};

loading.style.display = "none";
