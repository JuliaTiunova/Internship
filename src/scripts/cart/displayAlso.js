import { getElement } from "../assets";
import { API_URL } from "../products/displayProd";
import product from "../../templates/products.handlebars";

export function displayAlso() {
  const name = getElement(".basket__name");
  const wrapper = getElement(".shopper__also");
  let item = new XMLHttpRequest();
  item.open("GET", `${API_URL}?id=${name.dataset.id}`);
  item.responseType = "json";
  item.send();
  item.onload = function() {
    let result = item.response;
    let category = result.data[0].categories[1].id;
    let products = new XMLHttpRequest();
    products.open("GET", `${API_URL}?$limit=3&category.id=${category}`);
    products.responseType = "json";
    products.send();
    products.onload = function() {
      let item = products.response;
      wrapper.innerHTML = product(item);
    };
  };
}
