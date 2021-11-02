import { allCategoriesURL, getElement } from "./assets";
import displayCategory from "./displayCategoriesMain";
import displayList from "./displayList";
import { setUpOptions, setUpStore } from "./store";

const fetchProducts = async () => {
  let categories = new XMLHttpRequest();
  categories.open("GET", allCategoriesURL);
  categories.responseType = "json";
  categories.send();
  categories.onload = function() {
    let result = categories.response;
    let arr = result.data;
    setUpOptions(arr);
    setUpStore(arr);
    displayList(arr, getElement(".arrival__list"));
    displayList(arr, getElement(".feature__list"));
    displayCategory(arr, getElement(".header__categories"));
  };
};

export default fetchProducts;
