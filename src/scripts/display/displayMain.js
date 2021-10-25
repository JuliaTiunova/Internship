import { getElement } from "../assets";
import { API_URL } from "../products/displayProd";
import { sliderArrival, sliderFeature } from "../slider";
import headerProducts from "../../templates/headerProducts.handlebars";
import displayProd from "../../templates/displayProd.handlebars";
import { buttonsListenerCart } from "./listeners";

export const displayMain = (slider, arr, filters) => {
  slider.className = slider.classList[0];
  let item = getElement(".item_small_active");
  let textId = item.dataset.id;
  let productsAll = new XMLHttpRequest();

  if (arr) {
    let ids = [];
    arr.forEach((item) => ids.push(item.id));
    let random = Math.floor(Math.random() * 100).toFixed();
    while (random >= ids.length) {
      random = Math.floor(Math.random() * 100).toFixed();
    }
    console.log(random);
    productsAll.open("GET", `${API_URL}?$limit=4&category.id=${ids[random]}`);
  } else {
    productsAll.open("GET", `${API_URL}?$limit=25&category.id=${textId}`);
  }
  productsAll.responseType = "json";
  productsAll.send();
  productsAll.onload = function() {
    if (productsAll.status == 200) {
      let info = productsAll.response;
      if (arr) {
        slider.innerHTML = displayProd(info);
      } else {
        slider.innerHTML = headerProducts(info);
      }
      if (slider.className === "arrival__slider") {
        sliderArrival();
      }

      if (slider.className === "feature__products") {
        sliderFeature();
      }
      if (filters) return;
      buttonsListenerCart(slider);
    }
  };
};

export const buttonListener = (categoriesDOM, el) => {
  const listItem = document.querySelectorAll(`.list__item_small`);
  categoriesDOM.addEventListener("click", (e) => {
    const element = e.target;
    listItem.forEach((item) =>
      item.classList.contains("item_small_active")
        ? item.classList.remove("item_small_active")
        : item
    );
    element.classList.add("item_small_active");
    el.innerHTML = `<h3 class="loader" style="width: 100%">Loading...</h3>`;
    displayMain(el, false, true);
  });
};
