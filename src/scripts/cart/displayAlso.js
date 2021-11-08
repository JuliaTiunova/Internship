import { getElement, getStorageItem, setStorageItem } from "../assets";
import { API_URL } from "../products/displayProd";
import product from "../../templates/products.handlebars";
import { setStock } from "./setStock";

let stock = getStorageItem("stock");

// display sectio "you might also like"
export function displayAlso() {
  const name = getElement(".basket__name");
  const wrapper = getElement(".shopper__also");

  // get first product in basket and request info about it
  let item = new XMLHttpRequest();
  item.open("GET", `${API_URL}?id=${name.dataset.id}`);
  item.responseType = "json";
  item.send();
  item.onload = function() {
    let result = item.response;

    // get id of the last category in the list
    let category;
    (function findCategory() {
      for (let i = 4; i >= 0; i--) {
        if (result.data[0].categories[i]) {
          category = result.data[0].categories[i].id;
          return category;
        }
      }
    })();

    // get 3 products in this category
    let products = new XMLHttpRequest();
    products.open("GET", `${API_URL}?$limit=3&category.id=${category}`);
    products.responseType = "json";
    products.send();
    products.onload = function() {
      let item = products.response;
      // set stock if they render for the first time
      item.data.forEach((item) => {
        let is = stock.find((ent) => ent.id === item.id);

        // set "also", so in handlebars template it does not render "add to cart button"
        item.also = true;
        if (is) {
          item.stock = is.stock;
          setStorageItem("stock", stock);
        } else {
          item.stock = setStock() * 1;
          stock = [
            ...stock,
            { id: item.id, name: item.name, stock: item.stock },
          ];
          setStorageItem("stock", stock);
        }
      });
      wrapper.innerHTML = product(item);
    };
  };
}
