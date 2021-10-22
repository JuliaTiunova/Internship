import * as $ from "jquery";
import "../styles/products.scss";
import "./burger";
import "./cart";
import "./setupCart";
import { allCategoriesURL, getElement } from "./assets";
import displayList from "./displayList";
import {
  buttonCompany,
  buttonLayoutListener,
  buttonListenerProducts,
  buttonPageListener,
  buttonSearchListener,
  buttonSubCategories,
  display,
} from "./displayProd";
import { getPriceRange } from "./priceRange";
import { sortButtonListener } from "./sortingProducts";
import { displayMenu } from "./displayMenu";

$(".filters__form").attr("autocomplete", "off");

const init = () => {
  let categories = new XMLHttpRequest();
  categories.open("GET", allCategoriesURL);
  categories.responseType = "json";
  categories.send();
  categories.onload = function() {
    let result = categories.response;
    displayList(result, getElement(".filters__categories"));
    display(0);
    displayMenu(result);
    buttonListenerProducts(getElement(".filters__categories"));
    buttonPageListener();
    buttonSearchListener(
      getElement(".filters__search-button"),
      getElement(".filters__search")
    );
    buttonSubCategories();
    buttonCompany();
    getPriceRange();
  };
  sortButtonListener();
  buttonLayoutListener();
};

window.addEventListener("DOMContentLoaded", init);
