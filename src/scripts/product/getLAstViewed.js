import { getElement } from "../assets";
import products from "../../templates/products.handlebars";

export function getLastViewed() {
  const sliderView = getElement(".view__slider");
  let list = localStorage.getItem("lastViewed");
  list = list.split(",");

  list.forEach((item) => {
    let view = new XMLHttpRequest();
    view.open("GET", `http://localhost:3030/products?id=${item}`);
    view.responseType = "json";
    view.send();
    view.onload = function() {
      let response = view.response;
      return (sliderView.innerHTML += products(response));
    };
  });
}
