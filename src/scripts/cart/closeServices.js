import { getElement, getStorageItem, setStorageItem } from "../assets";
import { addTotalStyles, displayDiscount } from "./displayDiscount";
import { getInnerPrice } from "./getInnerPrice";
import * as $ from "jquery";

export const closeServices = (number, id) => {
  let servicesStorage = getStorageItem("services");
  const modal = getElement(".services__wrapper");
  const bottomTotal = getElement(".bottom__price");
  const basketTotal = document.querySelectorAll(".basket__total");
  const basketServices = document.querySelectorAll(".basket__services");
  const bottom = getElement(".bottom__services_price");
  const bottomWrapper = getElement(".bottom__services_wrapper");
  const newTotal = getElement(".bottom__newtotal");
  const coupon = getStorageItem("coupon");
  modal.classList.remove("open");
  let service;
  switch (number) {
    case 1:
      service = 30;
      break;
    case 2:
      service = 55;
      break;
    case 3:
      service = 70;
      break;
    default:
      service = 0;
      break;
  }

  let price = bottomTotal.innerHTML;
  price = getInnerPrice(price);
  let sum = 0;

  if (service > 0) {
    let setService = { name: service, hash: id, year: number };
    let item = servicesStorage.find((item) => item.hash == setService.hash);
    if (!item) {
      servicesStorage = [...servicesStorage, setService];
    } else {
      servicesStorage.map((item) => {
        if (item.hash == id && item.name == service) {
          return item;
        } else if (item.hash == id && item.name != service) {
          item.name = service;
          item.year = number;
          return item;
        }
      });
    }

    setStorageItem("services", servicesStorage);
    servicesStorage.forEach((ent) => {
      sum += ent.name;
    });
    $(bottomWrapper).slideDown(300);
    newTotal.innerHTML = `$${(price + sum).toFixed(2)}`;
    addTotalStyles(newTotal);
    $(newTotal).slideDown(300);
  } else {
    servicesStorage = servicesStorage.filter((ent) => ent.hash != id);
    setStorageItem("services", servicesStorage);
    if (servicesStorage.length == 0) {
      $(bottomWrapper)
        .slideDown(300)
        .delay(600)
        .slideUp(300);
      $(newTotal).slideUp(0);
    } else {
      servicesStorage.forEach((ent) => {
        sum += ent.name;
      });
    }
  }
  basketTotal.forEach((product) => {
    const cart = getStorageItem("cart");
    if (product.dataset.id == id) {
      let item = cart.find((ent) => ent.id === id);
      if (number > 0) {
        product.innerHTML = `$${item.amount * item.price + service}`;
      } else {
        product.innerHTML = `$${item.amount * item.price}`;
      }
    }
  });

  basketServices.forEach((basket) => {
    if (basket.dataset.id == id) {
      if (number > 0) {
        basket.innerHTML = `${number} Year Plan`;
      } else {
        basket.innerHTML = `Add services`;
      }
    }
  });

  bottom.innerHTML = `${
    service > 0 ? "+$" + sum.toFixed(2) : "+$" + sum.toFixed(2)
  }`;
  if (coupon.length > 0) {
    displayDiscount(coupon);
  }
};
