import "../styles/shopping_cart.scss";
import "./burger";
import "./cart";
import "./cart/setupCart";
import "./cart/coupons";

import { allCategoriesURL, getElement, getStorageItem } from "./assets";
import { displayMenu } from "./display/displayMenu";
import { countListener } from "./product/countListener";
import { displayCart } from "./cart/displayCart";
import { deleteComma } from "./product/deleteComma";
import { setupCartFunc } from "./cart/setupCart";
import { displayAlso } from "./cart/displayAlso";
import { displayCoupon } from "./cart/coupons";
import { updateCoupon } from "./cart/updateCoupon";
import { updateListener } from "./cart/updateListener";

const init = () => {
  let cart = getStorageItem("cart");
  let shopperAlso = getElement(".shopper__also_wrapper");
  let categories = new XMLHttpRequest();
  categories.open("GET", allCategoriesURL);
  categories.responseType = "json";
  categories.send();
  categories.onload = function() {
    let result = categories.response;
    displayCart();
    displayMenu(result);
    displayCoupon();
    updateCoupon();
    updateListener();

    if (cart.length >= 1) {
      const categoriesProduct = document.querySelectorAll(".basket__category");
      const cartItems = getElement(".shopper__basket");

      countListener("basket");
      displayAlso();
      setupCartFunc(cartItems);
      deleteComma(categoriesProduct);
    } else {
      shopperAlso.style.display = "none";
    }
  };
};

window.addEventListener("DOMContentLoaded", init);
