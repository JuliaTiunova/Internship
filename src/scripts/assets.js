import Handlebars from "handlebars/runtime";

const allCategoriesURL =
  "http://localhost:3030/categories?$limit=25&name=Guitars&name=Amps %26 Effects&name=Folk Instruments&name=Drums %26 Percussion&name=String Instruments";

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

Handlebars.registerHelper("times", function(a, b) {
  let number;
  b != 0.2
    ? (number = (a * b).toFixed(2))
    : (number = (a - a * 0.2).toFixed(2));
  return Number(number);
});

export { allCategoriesURL, getElement, setStorageItem, getStorageItem };
