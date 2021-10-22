import { allCategoriesURL, allProductsUrl, getElement } from "./assets";
import displayCategory from "./displayCategoriesMain";
import displayList from "./displayList";
import { setUpOptions, setUpStore } from "./store";

// const fetchProducts = async () => {
//   const response = await fetch(allProductsUrl).catch((err) => console.log(err));
//   if (response) {
//     return response.json();
//   }
//   return response;
// };

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
    // setUpFullStore();
    displayList(arr, getElement(".arrival__list"));
    displayList(arr, getElement(".feature__list"));
    displayCategory(arr, getElement(".header__categories"));
  };
};

// function fetchNewProducts() {
//   fetch("http://localhost:3030/products?$limit=25")
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err));
// }

// fetchNewProducts();

// let products = new XMLHttpRequest();
// products.open(
//   "GET",
//   "http://localhost:3030/categories?$limit=25&name=Musical Instruments"
// );
// products.responseType = "json";
// products.send();
// products.onload = function() {
//   let result = products.response;
//   let arr = result.data;
//   let sub = arr[0].subCategories;
//   let names = [];
//   for (let i = 0; i < sub.length; i++) {
//     names.push(sub[i].name);
//   }

// };
export default fetchProducts;
