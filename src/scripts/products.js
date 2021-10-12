import "../styles/products.scss";
import { allCategoriesURL, getElement } from "./assets";
import "./burger";
import "./cart";
import displayList from "./displayList";
import {
  buttonListenerProducts,
  buttonPageListener,
  display,
} from "./displayProd";
import "./setupCart";
import * as $ from "jquery";

$(".filters__form").attr("autocomplete", "off");

const init = () => {
  let categories = new XMLHttpRequest();
  categories.open("GET", allCategoriesURL);
  categories.responseType = "json";
  categories.send();
  categories.onload = function() {
    let result = categories.response;
    let arr = result.data;
    displayList(arr, getElement(".filters__categories"));
    display(0);
    buttonListenerProducts(getElement(".filters__categories"));
    buttonPageListener();
  };
};

window.addEventListener("DOMContentLoaded", init);
