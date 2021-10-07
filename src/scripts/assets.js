const allProductsUrl = "https://course-api.com/javascript-store-products";

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
  getElement,
  setStorageItem,
  getStorageItem,
};
