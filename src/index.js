import "./styles/styles.scss";
import "./scripts/slider";
// import "./scripts/setupCart";

import * as $ from "jquery";
import { getElement } from "./scripts/assets";
import { cart, wishlist } from "./scripts/cart";
import burger from "./scripts/burger";
import countdown from "./scripts/countdown";
import fetchProducts from "./scripts/fetchProducts";
import { setUpStore, store } from "./scripts/store";
import display from "./scripts/displayProd";

const cartButton = getElement(".button-cart");
const wishlistButton = getElement(".button-like");
const burgerButton = document.getElementById("index-burger");
const loading = getElement(".page-loading");

burger(burgerButton);
wishlist(wishlistButton);
cart(cartButton);
countdown();

const init = async () => {
  const products = await fetchProducts();
  if (products) {
    setUpStore(products);
    const all = store.filter((product) => product);
    display(all, getElement(".arrival__slider"));
    $(".arrival__slider").slick({
      slidesToShow: 5,
      slidesToScroll: 2,
      cssEase: "linear",
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      responsive: [
        {
          breakpoint: 1920,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
    const featured = store.filter((product) => product).slice(0, 4);
    display(featured, getElement(".feature__content"));
  }
};

window.addEventListener("DOMContentLoaded", init);
loading.style.display = "none";
