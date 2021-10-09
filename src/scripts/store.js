import { getStorageItem, setStorageItem } from "./assets";

let store = getStorageItem("store");
let categories = getStorageItem("categories");

const setUpOptions = (products) => {
  categories = products.map((product) => {
    const { name, id, subCategories } = product;
    return { name, id, subCategories };
  });
  setStorageItem("categories", categories);
};

const setUpStore = (products) => {
  store = products.map((product) => {
    const { name, id, subCategories } = product;
    console.log(name, subCategories);
    return { name, id, subCategories };
  });
  setStorageItem("store", store);
  // store = products.map((product) => {
  //   const {
  //     id,
  //     fields: { featured, name, price, company },
  //   } = product;

  //   return { id, featured, name, price, company };
  // });
  // setStorageItem("shop", store);
};

const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};

export { categories, store, setUpStore, findProduct, setUpOptions };
