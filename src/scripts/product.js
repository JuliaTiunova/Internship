import "../styles/product.scss";
import "./burger";
import "./cart";
import "./setupCart";

import { allCategoriesURL } from "./assets";
import { displayMenu } from "./displayMenu";
import { displayProduct } from "./product/detailsDisplay";

const init = () => {
  let categories = new XMLHttpRequest();
  categories.open("GET", allCategoriesURL);
  categories.responseType = "json";
  categories.send();
  categories.onload = function() {
    let result = categories.response;
    displayMenu(result);
    displayProduct();
  };
};

window.addEventListener("DOMContentLoaded", init);
