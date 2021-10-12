// import { formatPrice } from "./formatPrice";
import { getElement, setStorageItem } from "./assets";
import { addToCart, addToWishlist } from "./setupCart";
import { sliderArrival, sliderFeature } from "./slider";

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
      slider.innerHTML = arr
        .map((product) => {
          const { id, name, price, image } = product;
          return `<article class="slider__product product">
      <div class="product__wrapper">
        <div class="product__img_wrapper">
        <img class="product__img" src="${image}" alt="${name}" />
        <div class="product__hover hover">
          <button class="hover__box box_like button_small" data-id="${id}"><i class="icon-like"></i></button>
          <div class="hover__bottom">
              <div class="hover__box box_reload"><i class="icon-reload"></i></div>
              <button class="hover__button button_small" data-id="${id}"><i class="hover__button_img icon-cart" src="img/cart.png" alt="cart"></i>Add to cart</button>
              <a href="#" class="hover__box box_search box__link link"><i class="icon-search"></i></a>
          </div>
        </div>
        </div>
        <div class="product__ratings ratings"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i><i class="far fa-star"></i></div>
        <p class="product__name">${name}</p>
        <p class="product__price">$${price}</p>
        </div>
      </article>`;
        })
        .join("");

      if (slider.className === "arrival__slider") {
        // import("slick-carousel").then(() => {
        sliderArrival();
        // });
      }

      if (slider.className === "feature__products") {
        sliderFeature();
      }
    }
  };

  buttonsListenerCart(slider, text);
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
    el.innerHTML = `<h3 class="loader">Loading...</h3>`;
    displayMain(el);
  });
};

const display = (skip) => {
  const article = (id, name, price, image) => {
    return `<article class="display__product product">
    <div class="product__wrapper">
      <div class="product__img_wrapper">
      <img class="product__img" src="${image}" alt="${name}" />
      <div class="product__hover hover">
        <div class="hover__bottom">
            <button class="hover__button_round"><i class="icon-like"></i></button>
            <button class="hover__button_round"><i class="icon-reload"></i></button>
            <button class="hover__button_round"><i class="hover__button_img icon-cart" src="img/cart.png" alt="cart"></i></button>
            <button class="hover__button_round"><i class="icon-search"></i></button>
        </div>
      </div>
      </div>
      <div class="product__ratings ratings"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i><i class="far fa-star"></i></div>
      <p class="product__name">${name}</p>
      <p class="product__price">$${price}</p>
    </div>
  </article>`;
  };

  let element = getElement(".products__display");

  let item = getElement(".category__button_active");
  let textId = item.dataset.id;
  let productsAll = new XMLHttpRequest();
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

  productsAll.responseType = "json";
  productsAll.send();
  productsAll.onload = function() {
    if (productsAll.status == 200) {
      let info = productsAll.response;
      let arr = info.data;
      let total = info.total;
      addPagination(total, skip);
      showTotal(total, skip);
      element.innerHTML = arr
        .map((product) => {
          const { id, name, price, image } = product;
          return article(id, name, price, image);
        })
        .join("");
    }
  };
};

const buttonPageListener = () => {
  let pages = getElement(".pagination");
  let skip = 0;
  pages.addEventListener("click", (e) => {
    const element = e.target;

    element.classList.add("products__page_active");
    if (element.innerHTML > 1) {
      skip = (element.innerHTML - 1) * 12;
    } else {
      skip = 0;
    }

    display(skip);
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
      console.log("click");
      addToWishlist(parent.dataset.id);
    }
  });
};

const addPagination = (total, skip) => {
  let totalLeft = (total / 12).toFixed();
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
  console.log(skip);
  if (skip + 12 < total) {
    show.innerHTML = `Showing ${skip + 1} - ${skip + 12} of ${total}`;
  } else if (skip + 1 == total) {
    show.innerHTML = `Showing ${total} of ${total}`;
  } else if (total > 12) {
    show.innerHTML = `Showing ${skip + 1} - ${total} of ${total}`;
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
};
