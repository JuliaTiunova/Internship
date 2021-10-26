import { getElement } from "../assets";
import products from "../../templates/products.handlebars";
import { sliderRelatedProd } from "../slider";
import { deleteComma } from "./deleteComma";
import { buttonsListenerCart } from "../display/listeners";
// import jQuery from "jquery";

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
    let line = getElement(".info__categories");
    deleteComma(line);
    let info = related.response;
    sliderRelated.innerHTML = products(info);
    sliderRelatedProd();
    buttonsListenerCart(sliderRelated);
  };
}

// jQuery.event.special.touchstart = {
//   setup: function(_, ns, handle) {
//     this.addEventListener("touchstart", handle, {
//       passive: !ns.includes("noPreventDefault"),
//     });
//   },
// };
// jQuery.event.special.touchmove = {
//   setup: function(_, ns, handle) {
//     this.addEventListener("touchmove", handle, {
//       passive: !ns.includes("noPreventDefault"),
//     });
//   },
// };
// jQuery.event.special.wheel = {
//   setup: function(_, ns, handle) {
//     this.addEventListener("wheel", handle, { passive: true });
//   },
// };
// jQuery.event.special.mousewheel = {
//   setup: function(_, ns, handle) {
//     this.addEventListener("mousewheel", handle, { passive: true });
//   },
// };
