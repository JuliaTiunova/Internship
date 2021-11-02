import { getElement, getStorageItem, setStorageItem } from "../assets";
import products from "../../templates/products.handlebars";
import { buttonsListenerCart } from "../display/listeners";
import { setStock } from "../cart/setStock";

export function getLastViewed() {
  const sliderView = getElement(".view__slider");
  let list = JSON.parse(localStorage.getItem("lastViewed"));

  let stock = getStorageItem("stock");

  list.forEach((item) => {
    let view = new XMLHttpRequest();
    view.open("GET", `http://localhost:3030/products?id=${item}`);
    view.responseType = "json";
    view.send();
    view.onload = function() {
      let response = view.response;
      let info = response.data;
      info.forEach((item) => {
        let is = stock.find((ent) => ent.id === item.id);
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
      return (sliderView.innerHTML += products(response));
    };
  });

  buttonsListenerCart(sliderView);
}
