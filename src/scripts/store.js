import { getStorageItem, setStorageItem } from "./assets";

// let store = getStorageItem("store");
let categories = getStorageItem("categories");

// let guitars = getStorageItem("Guitars");
// let folk = getStorageItem("Folk Instruments");
// let ampsEffect = getStorageItem("Amps & Effects");
// let drums = getStorageItem("Drums & Percussion");
// let strings = getStorageItem("String Instruments");
// let storeArr = [];

// const loading = getElement(".page-loading");

const setUpOptions = (products) => {
  categories = products.map((product) => {
    const { name, id, subCategories } = product;
    return { name, id, subCategories };
  });
  setStorageItem("categories", categories);
};

// const setUpFullStore = () => {
//   storeArr.push(...guitars, ...folk, ...ampsEffect, ...drums, ...strings);
//   console.log(storeArr);
//   setStorageItem("store", storeArr);
// };

// const setUpStore = (products) => {
//   let fullArr = [];
//   store = products.map((product) => {
//     const { name } = product;
//     let productsAll = new XMLHttpRequest();
//     // let fullArr = [];
//     if (name == "Amps & Effects") {
//       productsAll.open(
//         "GET",
//         `http://localhost:3030/products?$limit=25&category.name=Amps %26 Effects`
//       );
//     } else if (name == "Drums & Percussion") {
//       productsAll.open(
//         "GET",
//         `http://localhost:3030/products?$limit=25&category.name=Drums %26 Percussion`
//       );
//     } else {
//       productsAll.open(
//         "GET",
//         `http://localhost:3030/products?$limit=25&category.name=${name}`
//       );
//     }
//     productsAll.responseType = "json";
//     productsAll.send();
//     productsAll.onload = function() {
//       let products = productsAll.response;
//       let arr = products.data;
//       // console.log(arr);
//       // console.log(products.total);
//       let number = 0;
//       let total = products.total;
//       fullArr = JSON.parse(JSON.stringify(arr));
//       while (total > 25) {
//         number += 25;
//         total -= 25;
//         let URL;
//         if (name == "Amps & Effects") {
//           URL = `http://localhost:3030/products?$limit=25&category.name=Amps %26 Effects&$skip=${number}`;
//         } else if (name == "Drums & Percussion") {
//           URL = `http://localhost:3030/products?$limit=25&category.name=Drums %26 Percussion&$skip=${number}`;
//         } else {
//           URL = `http://localhost:3030/products?$limit=25&category.name=${name}&$skip=${number}`;
//         }

//         let moreProducts = new XMLHttpRequest();
//         moreProducts.open("GET", URL);
//         moreProducts.responseType = "json";
//         moreProducts.send();
//         moreProducts.onload = function() {
//           let another = moreProducts.response;
//           let newArr = another.data;
//           fullArr.push(...newArr);
//           setFullStorage(fullArr, name);
//         };
//       }
//       setFullStorage(arr, name);
//       console.log(fullArr);
//       // let guitars = getStorageItem("Guitars");
//       // let folk = getStorageItem("Folk Instruments");
//       // let ampsEffect = getStorageItem("Amps & Effects");
//       // let drums = getStorageItem("Drums & Percussion");
//       // let strings = getStorageItem("String Instruments");
//       // let storeArr = [];
//       // storeArr.push(...guitars, ...folk, ...ampsEffect, ...drums, ...strings);
//       // console.log(storeArr);
//       // setStorageItem("store", storeArr);
//       // loading.style.display = "none";
//     };
//     setStorageItem("store", fullArr);
//   });
// };

// function setFullStorage(arr, name) {
//   const item = arr.map((item) => {
//     const {
//       id,
//       name,
//       description,
//       image,
//       manufacturer,
//       model,
//       price,
//       shipping,
//     } = item;
//     return {
//       id,
//       name,
//       description,
//       image,
//       manufacturer,
//       model,
//       price,
//       shipping,
//     };
//   });
//   setStorageItem(`${name}`, item);
//   return item;
// }

const findProduct = (id, name) => {
  console.log(name);
  console.log(id);
  let store = getStorageItem(name);
  console.log(store);
  // let product = store.find((product) => product.id === id);
  for (let product of store) {
    if (product.id == id) {
      return product;
    }
  }
};

export {
  categories,
  // store,
  // setUpFullStore,
  // setUpStore,
  findProduct,
  setUpOptions,
};
