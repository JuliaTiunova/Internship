import "../styles/shopping_cart.scss";
import "./burger";
import "./cart";
import "./cart/setupCart";

import { allCategoriesURL } from "./assets";
import { displayMenu } from "./display/displayMenu";
import { countListener } from "./product/countListener";
import { displayCart } from "./cart/displayCart";
import { deleteComma } from "./product/deleteComma";

const init = () => {
  let categories = new XMLHttpRequest();
  categories.open("GET", allCategoriesURL);
  categories.responseType = "json";
  categories.send();
  categories.onload = function() {
    let result = categories.response;
    displayCart();

    const categoriesProduct = document.querySelectorAll(".basket__category");
    deleteComma(categoriesProduct);
    displayMenu(result);
    countListener("basket");
  };
};

window.addEventListener("DOMContentLoaded", init);
