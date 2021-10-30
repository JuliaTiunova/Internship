import { getElement, getStorageItem } from "../assets";
import cartDisplay from "../../templates/cartDisplay.handlebars";
import Handlebars from "handlebars/runtime";
import { displayTotal } from "./displayTotal";
import { addTotalStyles, displayDiscount } from "./displayDiscount";
import { getInnerPrice } from "./getInnerPrice";
import * as $ from "jquery";

Handlebars.registerHelper("times", function(a, b) {
  return (a * b).toFixed(2);
});

export function displayCart() {
  const cartWrapper = getElement(".shopper__basket");
  const total = getElement(".bottom__price");
  const discount = getStorageItem("coupon");
  const bottomWrapper = getElement(".bottom__services_wrapper");
  let cart = getStorageItem("cart");
  let servicesStorage = getStorageItem("services");
  let data = [];
  data = [...cart];
  cart = [];
  cart.data = data;
  cartWrapper.innerHTML = cartDisplay(cart);
  if (servicesStorage.length > 0) {
    const basketServices = document.querySelectorAll(".basket__services");
    const basketTotal = document.querySelectorAll(".basket__total");
    const bottomTotal = getElement(".bottom__price");
    const bottomWrapper = getElement(".bottom__services_wrapper");
    const bottom = getElement(".bottom__services_price");
    const newTotal = getElement(".bottom__newtotal");
    basketServices.forEach((basket) => {
      servicesStorage.forEach((item) => {
        if (basket.dataset.id == item.hash) {
          basket.innerHTML = `${item.year} Year Plan`;
        }
      });
    });
    let price = bottomTotal.innerHTML;
    price = getInnerPrice(price);
    let sum = 0;
    servicesStorage.forEach((ent) => {
      sum += ent.name;
    });
    $(bottomWrapper).show();
    newTotal.innerHTML = `$${(price + sum).toFixed(2)}`;
    addTotalStyles(newTotal);
    $(newTotal).slideDown(300);

    basketTotal.forEach((total) => {
      const cart = getStorageItem("cart");
      servicesStorage.forEach((service) => {
        if (total.dataset.id == service.hash) {
          let item = cart.find((ent) => ent.id === service.hash);
          total.innerHTML = `$${item.amount * item.price + service.name}`;
        }
      });
    });

    bottom.innerHTML = `+$${sum.toFixed(2)}`;
  } else {
    $(bottomWrapper).hide();
  }
  if (discount.length == 0) {
    displayTotal(cart.data, total);
  } else {
    displayDiscount(discount.toUpperCase());
  }
}
