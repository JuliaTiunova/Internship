import "./styles/styles.scss";
import "./scripts/slider";
import "./scripts/setupCart";

import * as $ from "jquery";
import { allCategoriesURL, getElement, guitarURL } from "./scripts/assets";
import "./scripts/cart";
import "./scripts/burger";
import countdown from "./scripts/countdown";
import fetchProducts from "./scripts/fetchProducts";
import { setUpOptions, setUpStore, store } from "./scripts/store";
import display from "./scripts/displayProd";
import setUpCategories from "./scripts/filter";
import displayList from "./scripts/displayList";
import displayCategory from "./scripts/displayCategoriesMain";

const loading = getElement(".page-loading");

countdown();

const init = async () => {
  let categories = new XMLHttpRequest();
  categories.open("GET", allCategoriesURL);
  categories.responseType = "json";
  categories.send();
  categories.onload = function() {
    let result = categories.response;
    let arr = result.data;
    // let sub = arr[0].subCategories;
    // let names = [];
    // for (let i = 0; i < sub.length; i++) {
    //   names.push(sub[i].name);
    // }
    setUpOptions(arr);
    displayList(arr, getElement(".arrival__list"));
    displayList(arr, getElement(".feature__list"));
    displayCategory(arr, getElement(".header__categories"));
    // console.log(arr[1].subCategories[0].name);
  };

  // let categoryGuitar = new XMLHttpRequest();
  // categoryGuitar.open("GET", guitarURL);
  // categoryGuitar.responseType = "json";
  // categoryGuitar.send();
  // categoryGuitar.onload = function() {
  //   let result = categoryGuitar.response;
  //   let total = result.total;
  //   let arr = result.data;
  //   console.log(arr);
  //   // displayCategory(arr, "Guitars", total, getElement(".header__categories"));
  // };
  // const products = await fetchProducts();

  // if (products) {
  //   setUpStore(products);
  //   const all = store.filter((product) => product);
  //   const featured = store.filter((product) => product);

  //   display(all, getElement(".arrival__slider"));
  //   display(featured, getElement(".feature__products"));
  //   display(all.slice(-4), getElement(".deals__products"));

  //   setUpCategories(
  //     store,
  //     getElement(".feature__list"),
  //     getElement(".feature__products")
  //   );

  //   setUpCategories(
  //     store,
  //     getElement(".arrival__list"),
  //     getElement(".arrival__slider")
  //   );

  // $(".arrival__slider").slick({
  //   slidesToShow: 5,
  //   slidesToScroll: 2,
  //   cssEase: "linear",
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   arrows: true,
  //   responsive: [
  //     {
  //       breakpoint: 1920,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 1400,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         arrows: false,
  //       },
  //     },
  //   ],
  // });
  // $(".feature__products").slick({
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   cssEase: "linear",
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   arrows: true,
  //   responsive: [
  //     {
  //       breakpoint: 1400,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 578,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // });
  // }
};

window.addEventListener("DOMContentLoaded", init);
loading.style.display = "none";
