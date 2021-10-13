import { getElement, setStorageItem } from "./assets";
import { addToCart, addToWishlist } from "./setupCart";
import { sliderArrival, sliderFeature } from "./slider";
import products from "../templates/products.handlebars";
import headerProducts from "../templates/headerProducts.handlebars";
import errorMessage from "../templates/errorMessage.handlebars";

const displayMain = (slider) => {
  slider.className = slider.classList[0];
  let item = getElement(".item_small_active");
  let text = item.textContent;
  let textId = item.dataset.id;
  let productsAll = new XMLHttpRequest();

  productsAll.open(
    "GET",
    `http://localhost:3030/products?$limit=25&category.id=${textId}`
  );
  productsAll.responseType = "json";
  productsAll.send();
  productsAll.onload = function() {
    if (productsAll.status == 200) {
      let info = productsAll.response;
      let arr = info.data;
      let store = arr.map((product) => {
        const { id, name, price, image, manufacturer } = product;
        return { id, name, price, image, manufacturer };
      });

      setStorageItem(`${text}`, store);
      slider.innerHTML = headerProducts(info);
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

const display = (skip, name) => {
  let element = getElement(".products__display");
  let item = getElement(".category__button_active");
  let textId = item.dataset.id;
  let productsAll = new XMLHttpRequest();
  if (name && skip > 0) {
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

      if (total < 1) {
        element.innerHTML = errorMessage({
          product: name,
          category: item.textContent,
        });
      } else {
        element.innerHTML = products(info);
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

const buttonPageListener = () => {
  const pages = getElement(".pagination");
  const productWindow = getElement(".products");
  const input = getElement(".filters__search");

  let skip = 0;
  pages.addEventListener("click", (e) => {
    const element = e.target;

    element.classList.add("products__page_active");
    if (element.innerHTML > 1) {
      skip = (element.innerHTML - 1) * 12;
    } else {
      skip = 0;
    }
    productWindow.scrollIntoView();
    if (input.value) {
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
    display(0, name);
  });
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
    pages.innerHTML += `<button class="products__page"><i class="fas fa-chevron-right"></i></button>`;
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
};
