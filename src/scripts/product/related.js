import { getElement, getStorageItem, setStorageItem } from "../assets";
import products from "../../templates/products.handlebars";
import { sliderRelatedProd } from "../slider";
import { deleteComma } from "./deleteComma";
import { buttonsListenerCart } from "../display/listeners";
import { setStock } from "../cart/setStock";
import { valueSet } from "../cart/setupCart";

export function getRelated(id) {
  const sliderRelated = getElement(".related__slider");
  let stock = getStorageItem("stock");
  let related = new XMLHttpRequest();
  related.open(
    "GET",
    `http://localhost:3030/products?category.id=${id}&$limit=25`
  );
  related.responseType = "json";
  related.send();
  related.onload = function() {
    let line = getElement(".info__categories");
    deleteComma(line);
    let info = related.response;
    info.data.forEach((item) => {
      let is = stock.find((ent) => ent.id === item.id);
      if (is) {
        item.stock = is.stock;
        setStorageItem("stock", stock);
      } else {
        item.stock = setStock() * 1;
        stock = [...stock, { id: item.id, name: item.name, stock: item.stock }];
        setStorageItem("stock", stock);
      }
    });
    sliderRelated.innerHTML = products(info);
    sliderRelatedProd();

    valueSet();
    buttonsListenerCart(sliderRelated);
  };
}
