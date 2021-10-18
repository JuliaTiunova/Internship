import "./styles/styles.scss";
import "./scripts/slider";
import "./scripts/setupCart";

import { allCategoriesURL, getElement } from "./scripts/assets";
import "./scripts/cart";
import "./scripts/burger";
import countdown from "./scripts/countdown";
import displayCategory from "./scripts/displayCategoriesMain";
import { buttonListener, displayMain } from "./scripts/displayProd";
import displayList from "./scripts/displayList";
import { setUpOptions } from "./scripts/store";

const loading = getElement(".page-loading");

const init = () => {
  countdown();
  let categories = new XMLHttpRequest();
  categories.open("GET", allCategoriesURL);
  categories.responseType = "json";
  categories.send();
  categories.onload = function() {
    let result = categories.response;
    let arr = result.data;
    setUpOptions(arr);
    displayList(result, getElement(".arrival__list"));
    displayList(result, getElement(".feature__list"));
    displayCategory(arr, getElement(".header__categories"));
    displayMain(getElement(".arrival__slider"));
    displayMain(getElement(".feature__products"));
    displayMain(getElement(".deals__products"), arr);
    buttonListener(
      getElement(".arrival__list"),
      getElement(".arrival__slider")
    );
    buttonListener(
      getElement(".feature__list"),
      getElement(".feature__products")
    );
  };
};

window.addEventListener("DOMContentLoaded", init);
loading.style.display = "none";
