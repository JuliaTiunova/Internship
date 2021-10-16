import * as $ from "jquery";
import { getElement } from "./assets";
import { addToCart, addToWishlist } from "./setupCart";
import { sliderArrival, sliderFeature } from "./slider";
import products from "../templates/products.handlebars";
import productsList from "../templates/productsList.handlebars";
import headerProducts from "../templates/headerProducts.handlebars";
import displayProd from "../templates/displayProd.handlebars";

import errorMessage from "../templates/errorMessage.handlebars";

let list = false;

const displayMain = (slider, arr) => {
  slider.className = slider.classList[0];
  let item = getElement(".item_small_active");
  let text = item.textContent;
  let textId = item.dataset.id;
  let productsAll = new XMLHttpRequest();

  if (arr) {
    let ids = [];
    arr.forEach((item) => ids.push(item.id));
    productsAll.open(
      "GET",
      `http://localhost:3030/products?$limit=4&category.id=${ids[0]}`
    );
  } else {
    productsAll.open(
      "GET",
      `http://localhost:3030/products?$limit=25&category.id=${textId}`
    );
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
    }
  };

  buttonsListenerCart(slider, text);
};

const display = (skip, name, manufacturer) => {
  let element = getElement(".products__display");
  let item = getElement(".category__button_active");
  let elementCompany = getElement(".filters__companies");
  let textId = item.dataset.id;
  let productsAll = new XMLHttpRequest();

  if (manufacturer) {
    productsAll.open(
      "GET",
      `http://localhost:3030/products?$limit=12&$skip=${skip}&name[$like]=*${name}*&manufacturer=${manufacturer}&category.id=${textId}`
    );
  } else if (name && skip > 0) {
    productsAll.open(
      "GET",
      `http://localhost:3030/products?$limit=12&$skip=${skip}&name[$like]=*${name}*&category.id=${textId}`
    );
  } else if (name) {
    productsAll.open(
      "GET",
      `http://localhost:3030/products?$limit=12&name[$like]=*${name}*&category.id=${textId}`
    );
  } else {
    if (skip > 0) {
      productsAll.open(
        "GET",
        `http://localhost:3030/products?$limit=12&$skip=${skip}&category.id=${textId}`
      );
    } else {
      productsAll.open(
        "GET",
        `http://localhost:3030/products?$limit=12&&category.id=${textId}`
      );
    }
  }

  productsAll.responseType = "json";
  productsAll.send();
  productsAll.onload = function() {
    if (productsAll.status == 200) {
      let info = productsAll.response;
      let total = info.total;

      if (!manufacturer) {
        let comp = new XMLHttpRequest();
        comp.open(
          "GET",
          `http://localhost:3030/products?$limit=25&category.id=${textId}&$select[]=manufacturer`
        );
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
            all.open(
              "GET",
              `http://localhost:3030/products?$limit=25&$skip=${number}&category.id=${textId}&$select[]=manufacturer`
            );
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
        element.innerHTML = errorMessage({
          product: name,
          category: item.textContent,
        });
      } else if (list) {
        element.innerHTML = productsList(info);
        element.classList.add("product__list");
      } else {
        element.innerHTML = products(info);
        element.classList.remove("product__list");
      }
      addPagination(total, skip);
      showTotal(total, skip);
    }
  };
};

const buttonListener = (categoriesDOM, el) => {
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
    displayMain(el);
  });
};

const buttonCompany = () => {
  const names = getElement(".filters__companies");

  names.addEventListener("click", (e) => {
    const element = e.target;
    const buttonCompanies = document.querySelectorAll(".company__button");
    buttonCompanies.forEach((item) =>
      item.classList.contains("company__button_active")
        ? item.classList.remove("company__button_active")
        : item
    );

    element.classList.add("company__button_active");
    display(0, "", element.innerHTML);
  });
};

const buttonLayoutListener = () => {
  const productsLayout = document.querySelectorAll(".products__layout");

  productsLayout.forEach((button) => {
    button.addEventListener("click", (e) => {
      const input = getElement(".filters__search");
      const companies = document.querySelectorAll(".company__button");
      let company = [];
      companies.forEach((item) =>
        item.classList.contains("company__button_active")
          ? company.push(item.innerHTML)
          : item
      );

      button.classList.add("products__layout_active");
      if (
        e.target.classList.contains("layout_list") ||
        e.target.parentElement.classList.contains("layout_list")
      ) {
        list = true;
        button.previousElementSibling.classList.remove(
          "products__layout_active"
        );
      } else {
        list = false;
        button.nextElementSibling.classList.remove("products__layout_active");
      }

      if (company.length == 1) {
        display(0, input.value, company[0]);
      } else if (input.value && company.length != 1) {
        display(0, input.value);
      } else {
        display(0);
      }
    });
  });
};

const buttonPageListener = () => {
  const pages = getElement(".pagination");
  const productWindow = getElement(".products");
  const input = getElement(".filters__search");

  let skip = 0;

  pages.addEventListener("click", (e) => {
    const element = e.target;
    let active = getElement(".products__page_active");

    const companies = document.querySelectorAll(".company__button");
    let company = [];
    companies.forEach((item) =>
      item.classList.contains("company__button_active")
        ? company.push(item.innerHTML)
        : item
    );

    if (
      element.classList.contains("products__page_next") ||
      element.classList.contains("fas")
    ) {
      skip = active.innerHTML * 12;
      if (
        active.nextElementSibling.classList.contains("products__page_next") ||
        active.nextElementSibling.classList.contains("fas")
      ) {
        skip = (active.innerHTML - 1) * 12;
      } else {
        active.classList.remove(".products__page_active");
        active.nextElementSibling.classList.add(".products__page_active");
      }
    } else {
      element.classList.add("products__page_active");
      if (element.innerHTML > 1) {
        skip = (element.innerHTML - 1) * 12;
      } else {
        skip = 0;
      }
    }
    productWindow.scrollIntoView();

    if (company.length == 1) {
      display(skip, input.value, company[0]);
    } else if (input.value && company.length != 1) {
      display(skip, input.value);
    } else {
      display(skip);
    }
  });
};

const buttonListenerProducts = (categoriesDOM) => {
  const buttonItem = document.querySelectorAll(".category__button");

  categoriesDOM.addEventListener("click", (e) => {
    const element = e.target;

    buttonItem.forEach((item) => {
      item.classList.contains("category__button_active")
        ? item.classList.remove("category__button_active")
        : item;
    });
    element.classList.add("category__button_active");
    if (element.nextElementSibling) {
      if (element.nextElementSibling.classList.contains("category__wrapper")) {
        $(element)
          .next()
          .toggle(500);
      }
    }

    const productWindow = getElement(".products");
    productWindow.scrollIntoView();
    display(0);
  });
};

const buttonsListenerCart = (element, name) => {
  element.addEventListener("click", function(e) {
    const parent = e.target.parentElement;
    if (e.target.classList.contains("hover__button")) {
      addToCart(e.target.dataset.id, name);
    } else if (parent.classList.contains("box_like")) {
      addToWishlist(parent.dataset.id);
    }
  });
};

const buttonSearchListener = (button, input) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let name = input.value;

    const companies = document.querySelectorAll(".company__button");
    let company = [];
    companies.forEach((item) =>
      item.classList.contains("company__button_active")
        ? company.push(item.innerHTML)
        : item
    );
    if (company.length == 1) {
      display(0, name, company[0]);
    } else {
      display(0, name);
    }
  });
};

const buttonSubCategories = () => {
  $(".category__wrapper").hide();
};

const addPagination = (total, skip) => {
  let totalLeft = Math.floor(total / 12);
  totalLeft = totalLeft * 1;
  const pages = getElement(".pagination");
  let count = [];
  if (total - 12 > 0) {
    for (let i = 0; i <= totalLeft; i++) {
      count.push(i + 1);
    }
    pages.innerHTML = count
      .map((item) => {
        return `<button class="products__page">${item}</button>`;
      })
      .join("");
    pages.innerHTML += `<button class="products__page products__page_next"><i class="fas fa-chevron-right"></i></button>`;
  } else {
    pages.innerHTML = `<button class="products__page">1</button>`;
  }

  let pagesButton = document.querySelectorAll(".products__page");
  if (skip > 0) {
    let number = skip / 12 + 1;
    pagesButton.forEach((item) => {
      item.innerHTML == number
        ? item.classList.add("products__page_active")
        : item;
    });
  } else {
    pagesButton.forEach((item) => {
      item.innerHTML == "1"
        ? item.classList.add("products__page_active")
        : item;
    });
  }

  if (total - 12 > 0) {
    const active = getElement(".products__page_active");
    const next = getElement(".products__page_next");

    if (active.nextSibling === next) {
      next.classList.add("products__page_inactive");
    }
  }
};

const showTotal = (total, skip) => {
  let show = getElement(".products__result");
  if (skip + 12 < total) {
    show.innerHTML = `Showing ${skip + 1} - ${skip + 12} of ${total}`;
  } else if (skip + 1 == total) {
    show.innerHTML = `Showing ${total} of ${total}`;
  } else if (total > 12) {
    show.innerHTML = `Showing ${skip + 1} - ${total} of ${total}`;
  } else if (skip < 1 && total < 1) {
    show.innerHTML = `Showing ${total}`;
  } else {
    show.innerHTML = `Showing ${skip + 1} - ${total} of ${total}`;
  }
};

export {
  display,
  displayMain,
  buttonListener,
  buttonListenerProducts,
  buttonPageListener,
  buttonSearchListener,
  buttonSubCategories,
  buttonCompany,
  buttonLayoutListener,
};
