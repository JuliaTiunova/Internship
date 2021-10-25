import * as $ from "jquery";
import "../styles/products.scss";
import "./burger";
import "./cart";
import "./cart/setupCart";
import { allCategoriesURL, getElement } from "./assets";
import displayList from "./display/displayList";
import { display } from "./products/displayProd";
import { getPriceRange } from "./products/priceRange";
import { sortButtonListener } from "./products/sortingProducts";
import { displayMenu } from "./display/displayMenu";
import { buttonPageListener } from "./products/buttonPageListener";
import { buttonLayoutListener } from "./products/buttonLayoutListener";
import { buttonCompany } from "./products/buttonCompanyListener";
import { buttonListenerProducts } from "./products/buttonProdListener";
import { buttonSearchListener } from "./products/buttonSearchListener";
import { buttonSubCategories } from "./products/hideSubcategories";

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
