import { getElement } from "../assets";
import products from "../../templates/products.handlebars";
import productsList from "../../templates/productsList.handlebars";

import errorMessage from "../../templates/errorMessage.handlebars";
import { getMaxPrice, getMinPrice, getPriceRange } from "./priceRange";
import { addPagination } from "./addPagination";
import { showTotal } from "./showTotal";
import { getLayout, getNumber } from "./getLayout";
import { buildLink, openRequest } from "../openRequest";
import { buttonsListenerCart } from "../display/listeners";

export const API_URL = `http://localhost:3030/products`;

export const display = (skip, manufacturer, price, button, filters) => {
  const input = getElement(".filters__search");
  const element = getElement(".products__display");
  const item = getElement(".category__button_active");
  const elementCompany = getElement(".filters__companies");
  const textId = item.dataset.id;
  const priceDisplay = document.querySelectorAll(".filters__price span");
  let productsAll = new XMLHttpRequest();

  let list = getLayout();
  let number = getNumber(list);

  if (!price) {
    getMaxPrice(priceDisplay, textId, manufacturer);
    getMinPrice(priceDisplay, textId, manufacturer);
    getPriceRange();
  }

  let link = buildLink(number, skip, textId);

  if (button) {
    if (button.value == "priceLow") {
      link += `&$sort[price]=1`;
    } else if (button.value == "priceHigh") {
      link += `&$sort[price]=-1`;
    }
  }

  if (price && manufacturer == "") {
    let max = price[1] * 1;
    let min = price[0] * 1;
    link += `&price[$lte]=${max}&price[$gt]=${min}&name[$like]=*${input.value}*`;
    productsAll.open = openRequest(productsAll, link);
  } else if (price && manufacturer) {
    let max = price[1] * 1;
    let min = price[0] * 1;
    link += `&price[$lte]=${max}&price[$gt]=${min}&name[$like]=*${input.value}*&manufacturer=${manufacturer}`;
    productsAll.open = openRequest(productsAll, link);
  } else if (manufacturer && !input.value) {
    link += `&manufacturer=${manufacturer}`;
    productsAll.open = openRequest(productsAll, link);
  } else if (input.value && manufacturer) {
    link += `&name[$like]=*${input.value}*&manufacturer=${manufacturer}`;
    productsAll.open = openRequest(productsAll, link);
  } else if (input.value && skip > 0) {
    link += `&name[$like]=*${input.value}*`;
    productsAll.open = openRequest(productsAll, link);
  } else if (input.value) {
    link += `&name[$like]=*${input.value}*`;
    productsAll.open = openRequest(productsAll, link);
  } else {
    productsAll.open = openRequest(productsAll, link);
  }

  productsAll.responseType = "json";
  productsAll.send();
  productsAll.onload = function() {
    if (productsAll.status == 200) {
      let info = productsAll.response;
      let total = info.total;

      if (!manufacturer) {
        link = `${API_URL}?$limit=25&category.id=${textId}&$select[]=manufacturer`;
        let comp = new XMLHttpRequest();
        comp.open = openRequest(comp, link);
        comp.responseType = "json";
        comp.send();
        comp.onload = function() {
          let info = comp.response;
          let total = info.total;
          let number = 0;
          let companies = info.data.map((item) => {
            return item.manufacturer;
          });
          let unique = companies.filter((value, index, array) => {
            return array.indexOf(value) === index;
          });
          elementCompany.innerHTML = unique
            .map((item) => {
              return `<button class="filter company__button">${item}</button>`;
            })
            .join("");

          while (total > 25) {
            number += 25;
            total -= 25;
            let all = new XMLHttpRequest();
            link = buildLink(25, number, textId);
            link += `&$select[]=manufacturer`;
            all.open = openRequest(all, link);
            all.responseType = "json";
            all.send();
            all.onload = function() {
              let info = all.response;
              let companies = info.data.map((item) => {
                return item.manufacturer;
              });
              unique.push(...companies);
              unique = unique.filter((value, index, array) => {
                return array.indexOf(value) === index;
              });
              unique = unique.sort((a, b) => (a > b ? 1 : -1));
              elementCompany.innerHTML = unique
                .map((item) => {
                  return `<button class="filter company__button">${item}</button>`;
                })
                .join("");
            };
          }
        };
      }

      if (total < 1) {
        element.innerHTML = errorMessage();
      } else if (list) {
        element.innerHTML = productsList(info);
        element.classList.add("product__list");
      } else {
        element.innerHTML = products(info);
        element.classList.remove("product__list");
      }
      addPagination(total, skip);
      showTotal(total, skip);
      if (filters) return;
      buttonsListenerCart(element);
    }
  };
};
