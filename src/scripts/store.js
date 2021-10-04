import { getStorageItem, setStorageItem } from "./assets";

let store = getStorageItem("shop");

const setUpStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { featured, name, price, company },
    } = product;

    return { id, featured, name, price, company };
  });
  setStorageItem("shop", store);
};

const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};

export { store, setUpStore, findProduct };
