import "./styles/styles.scss";
import "./scripts/slider";
import "./scripts/setupCart";

import * as $ from "jquery";
import { getElement } from "./scripts/assets";
import "./scripts/cart";
import "./scripts/burger";
import countdown from "./scripts/countdown";
import fetchProducts from "./scripts/fetchProducts";
import { setUpStore, store } from "./scripts/store";
import display from "./scripts/displayProd";
import setUpCategories from "./scripts/filter";

const loading = getElement(".page-loading");

countdown();

const init = async () => {
  const products = await fetchProducts();
  if (products) {
    setUpStore(products);
    const all = store.filter((product) => product);
    const featured = store.filter((product) => product);

    display(all, getElement(".arrival__slider"));
    display(featured, getElement(".feature__products"));
    display(all.slice(-4), getElement(".deals__products"));

    setUpCategories(
      store,
      getElement(".feature__list"),
      getElement(".feature__products")
    );

    setUpCategories(
      store,
      getElement(".arrival__list"),
      getElement(".arrival__slider")
    );

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
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
    $(".feature__products").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      cssEase: "linear",
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      responsive: [
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
          },
        },
        {
          breakpoint: 578,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }
};

window.addEventListener("DOMContentLoaded", init);
loading.style.display = "none";
