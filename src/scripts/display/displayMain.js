import { getElement, getStorageItem, setStorageItem } from "../assets";
import { API_URL } from "../products/displayProd";
import { sliderArrival, sliderFeature } from "../slider";
import headerProducts from "../../templates/headerProducts.handlebars";
import displayProd from "../../templates/displayProd.handlebars";
import { buttonsListenerCart } from "./listeners";
import { setStock } from "../cart/setStock";
import { valueSet } from "../cart/setupCart";
let stock = getStorageItem("stock");

export const displayMain = (arr, filters, el) => {
  const arrival = getElement(".arrival__slider");
  const feature = getElement(".feature__products");
  const deals = getElement(".deals__products");

  let sliders = [];
  if (el) {
    if (el.classList.contains("arrival__slider")) {
      sliders.push(arrival);
    } else if (el.classList.contains("feature__products")) {
      sliders.push(feature);
    }
  } else {
    sliders.push(arrival, feature, deals);
  }

  sliders.forEach((slider) => {
    slider.className = slider.classList[0];
    let item = getElement(".item_small_active");
    let textId = item.dataset.id;
    let productsAll = new XMLHttpRequest();

    if (slider.className === "deals__products") {
      let ids = [];
      arr.forEach((item) => ids.push(item.id));
      let random = Math.floor(Math.random() * 100).toFixed();
      while (random >= ids.length) {
        random = Math.floor(Math.random() * 100).toFixed();
      }
      productsAll.open("GET", `${API_URL}?$limit=4&category.id=${ids[random]}`);
    } else {
      productsAll.open("GET", `${API_URL}?$limit=25&category.id=${textId}`);
    }
    productsAll.responseType = "json";
    productsAll.send();
    productsAll.onload = function() {
      if (productsAll.status == 200) {
        let info = productsAll.response;
        info.data.forEach((item) => {
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
        if (slider.className === "deals__products") {
          slider.innerHTML = displayProd(info);
        } else {
          slider.innerHTML = headerProducts(info);
        }

        if (slider.className === "feature__products") {
          sliderFeature();
          valueSet();
        }

        if (slider.className === "arrival__slider") {
          sliderArrival();
        }

        if (el) {
          valueSet();
        }

        if (filters) return;
        buttonsListenerCart(slider);
      }
    };
  });
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
    displayMain(false, true, el);
  });
};
