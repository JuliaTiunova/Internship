import { getStorageItem, setStorageItem } from "./assets";

let categories = getStorageItem("categories");

const setUpOptions = (products) => {
  categories = products.map((product) => {
    const { name, id, subCategories } = product;
    return { name, id, subCategories };
  });
  setStorageItem("categories", categories);
};

const findProduct = (id, name) => {
  let store = getStorageItem(name);
  for (let product of store) {
    if (product.id == id) {
      return product;
    }
  }
};

export { categories, findProduct, setUpOptions };
