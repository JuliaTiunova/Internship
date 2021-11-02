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

import { allCategoriesURL, getElement } from "./assets";
import { displayMenu } from "./display/displayMenu";
import { displayCartItems } from "./checkout/displayCartItems";

const loading = getElement(".page-loading");

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
