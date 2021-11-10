import { getElement, getStorageItem } from "../assets";
import orderRender from "../../templates/order.handlebars";
import Handlebars from "handlebars/runtime";
import { setOrder } from "./setOrder";

// helpers for displaying order after submit

Handlebars.registerHelper("servicesSum", function(arr) {
  return getServiceSum(arr);
});

// order number is for appearence, I don't save it
Handlebars.registerHelper("orderNumber", function() {
  let number = Math.floor(Math.random() * 100000).toFixed();
  while (number >= 100000 || number <= 9999) {
    number = Math.floor(Math.random() * 100000).toFixed();
  }
  return number;
});

// to hide card number
Handlebars.registerHelper("transformNumbers", function(str) {
  str = str.split(" ");
  str[1] = "****";
  str[2] = "****";
  str = str.join(" ");
  return str;
});

function getServiceSum(arr) {
  let sum = arr.reduce((total, item) => total + item.name, 0);
  return sum.toFixed(2);
}

// gather data and display order

export function getData(form) {
  const orderWrapper = getElement(".order__wrapper");
  let data = {};
  let formInfo = new FormData(form);

  for (let [name, value] of formInfo) {
    if (value != "") {
      data[name] = value;
    }
  }

  let cart = getStorageItem("cart");
  let coupon = getStorageItem("coupon");
  let services = getStorageItem("services");

  let products = [];
  let order = {};
  products = [...cart];
  order.products = products;

  order.info = data;

  if (coupon.length > 0) {
    order.discount = coupon;
  }
  if (services.length > 0) {
    order.services = services;
  }
  orderWrapper.innerHTML = orderRender(order);
  orderWrapper.classList.add("open");
  setOrder(order);
}
