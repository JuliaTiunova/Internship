import { getElement, getStorageItem, setStorageItem } from "../assets";
import { API_URL } from "../products/displayProd";
import product from "../../templates/products.handlebars";
import { setStock } from "./setStock";

let stock = getStorageItem("stock");

export function displayAlso() {
  const name = getElement(".basket__name");
  const wrapper = getElement(".shopper__also");
  let item = new XMLHttpRequest();
  item.open("GET", `${API_URL}?id=${name.dataset.id}`);
  item.responseType = "json";
  item.send();
  item.onload = function() {
    let result = item.response;

    let category;
    (function findCategory() {
      for (let i = 4; i >= 0; i--) {
        if (result.data[0].categories[i]) {
          category = result.data[0].categories[i].id;
          return category;
        }
      }
    })();

    let products = new XMLHttpRequest();
    products.open("GET", `${API_URL}?$limit=3&category.id=${category}`);
    products.responseType = "json";
    products.send();
    products.onload = function() {
      let item = products.response;
      item.data.forEach((item) => {
        let is = stock.find((ent) => ent.id === item.id);
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
