import { allProductsUrl } from "./assets";

const fetchProducts = async () => {
  const response = await fetch(allProductsUrl).catch((err) => console.log(err));
  if (response) {
    return response.json();
  }
  return response;
};

// function fetchNewProducts() {
//   fetch("http://localhost:3030/products?$limit=25")
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err));
// }

// fetchNewProducts();

let products = new XMLHttpRequest();
products.open(
  "GET",
  "http://localhost:3030/categories?$limit=25&name=Musical Instruments"
);
products.responseType = "json";
products.send();
products.onload = function() {
  let result = products.response;
  let arr = result.data;
  let sub = arr[0].subCategories;
  let names = [];
  for (let i = 0; i < sub.length; i++) {
    names.push(sub[i].name);
  }

  // console.log(result);
};
// console.log(products.response);
export default fetchProducts;
