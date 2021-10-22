const allProductsUrl = "https://course-api.com/javascript-store-products";

const allCategoriesURL =
  "http://localhost:3030/categories?$limit=25&name=Guitars&name=Amps %26 Effects&name=Folk Instruments&name=Drums %26 Percussion&name=String Instruments";

const guitarURL =
  "http://localhost:3030/products?$limit=25&category.name=Guitars";

const singleProductUrl =
  "https://course-api.com/javascript-store-single-product";

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `The "${selection}" element you are looking for does not exist`
  );
};

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }
  return storageItem;
};

export {
  allProductsUrl,
  singleProductUrl,
  allCategoriesURL,
  guitarURL,
  getElement,
  setStorageItem,
  getStorageItem,
};
