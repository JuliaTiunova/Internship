import { getElement, getStorageItem, setStorageItem } from "../assets";
import { addTotalStyles, displayDiscount } from "./displayDiscount";
import * as $ from "jquery";
import { displayTotals } from "./displayTotal";
import { getTotals } from "./getTotals";

// when services window is closed, depending on what was chosen
export const closeServices = (number, id) => {
  let servicesStorage = getStorageItem("services");
  const modal = getElement(".services__wrapper");
  const cart = getStorageItem("cart");
  const basketTotal = document.querySelectorAll(".basket__total");
  const basketServices = document.querySelectorAll(".basket__services");
  const bottomWrapper = getElement(".bottom__services_wrapper");
  const newTotal = getElement(".bottom__newtotal");
  const coupon = getStorageItem("coupon");
  modal.classList.remove("open");

  function getServiceNumber(number) {
    const number2Mapping = {
      1: 30,
      2: 55,
      3: 70,
    };

    return number2Mapping[number] ?? 0;
  }

  // service amount
  let service = getServiceNumber(number);

  // assign service to a certain product id in the cart
  if (service > 0) {
    let setService = { name: service, hash: id, year: number };
    let item = servicesStorage.find((item) => item.hash == setService.hash);
    if (!item) {
      servicesStorage = [...servicesStorage, setService];
    } else {
      // remove previous service if there was for this product
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

    let totals = getTotals(cart);
    displayTotals(totals);
    $(bottomWrapper).slideDown(300);
    addTotalStyles(newTotal);
  } else {
    // remove services for this product if pressed "no, thanks"
    servicesStorage = servicesStorage.filter((ent) => ent.hash != id);
    setStorageItem("services", servicesStorage);

    // if no services left in the storage slide up sum display
    if (servicesStorage.length == 0) {
      $(bottomWrapper)
        .slideDown(300)
        .delay(600)
        .slideUp(300);
      $(newTotal).slideUp(0);
    }
  }

  // display new total for certain product
  basketTotal.forEach((product) => {
    // const cart = getStorageItem("cart");
    if (product.dataset.id == id) {
      let item = cart.find((ent) => ent.id === id);
      if (number > 0) {
        product.innerHTML = `$${(item.amount * item.price + service).toFixed(
          2
        )}`;
      } else {
        product.innerHTML = `$${(item.amount * item.price).toFixed(2)}`;
      }
    }
  });

  // display chosen cervices for product
  basketServices.forEach((basket) => {
    if (basket.dataset.id == id) {
      if (number > 0) {
        basket.innerHTML = `${number} Year Plan`;
      } else {
        basket.innerHTML = `Add services`;
      }
    }
  });

  let totals = getTotals(cart);
  displayTotals(totals);

  // if discount is applied
  if (coupon.length > 0) {
    displayDiscount(coupon);
  }
};
