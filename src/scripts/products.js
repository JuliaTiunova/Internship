import "../styles/products.scss";
import { allCategoriesURL, getElement } from "./assets";
import "./burger";
import "./cart";
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
import "./setupCart";
import * as $ from "jquery";
import { getPriceRange } from "./priceRange";

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
  buttonLayoutListener();
};

window.addEventListener("DOMContentLoaded", init);
