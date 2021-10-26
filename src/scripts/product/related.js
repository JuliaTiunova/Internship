import { getElement } from "../assets";
import products from "../../templates/products.handlebars";
import { sliderRelatedProd } from "../slider";
import { deleteComma } from "./deleteComma";

export function getRelated(id) {
  const sliderRelated = getElement(".related__slider");
  let related = new XMLHttpRequest();
  related.open(
    "GET",
    `http://localhost:3030/products?category.id=${id}&$limit=25`
  );
  related.responseType = "json";
  related.send();
  related.onload = function() {
    deleteComma();
    let info = related.response;
    sliderRelated.innerHTML = products(info);
    sliderRelatedProd();
  };
}
