import "../styles/shopping_cart.scss";
import "./burger";
import "./cart";
import "./setupCart";

import { allCategoriesURL } from "./assets";
import { displayMenu } from "./display/displayMenu";
import { countListener } from "./product/countListener";

const init = () => {
  let categories = new XMLHttpRequest();
  categories.open("GET", allCategoriesURL);
  categories.responseType = "json";
  categories.send();
  categories.onload = function() {
    let result = categories.response;
    displayMenu(result);
    countListener("basket");
  };
};

window.addEventListener("DOMContentLoaded", init);
