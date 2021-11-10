import { getElement, getStorageItem } from "../assets";
import cartDisplay from "../../templates/cartDisplay.handlebars";
import { displayTotals } from "./displayTotal";
import * as $ from "jquery";
import { getTotals } from "./getTotals";

export function displayCart() {
  const cartWrapper = getElement(".shopper__basket");
  const bottomWrapper = getElement(".bottom__services_wrapper");
  let cart = getStorageItem("cart");
  let servicesStorage = getStorageItem("services");

  // wrap cart items in data for handlebars iteration
  let data = [];
  let cartTemplate = [];
  data = [...cart];
  cartTemplate.data = data;
  cartWrapper.innerHTML = cartDisplay(cartTemplate);

  // display totals
  if (servicesStorage.length > 0) {
    const basketServices = document.querySelectorAll(".basket__services");
    const basketTotal = document.querySelectorAll(".basket__total");
    basketServices.forEach((basket) => {
      servicesStorage.forEach((item) => {
        if (basket.dataset.id == item.hash) {
          basket.innerHTML = `${item.year} Year Plan`;
        }
      });
    });

    basketTotal.forEach((total) => {
      const cart = getStorageItem("cart");
      servicesStorage.forEach((service) => {
        if (total.dataset.id == service.hash) {
          let item = cart.find((ent) => ent.id === service.hash);
          total.innerHTML = `$${(
            item.amount * item.price +
            service.name
          ).toFixed(2)}`;
        }
      });
    });
  } else {
    $(bottomWrapper).hide();
  }

  let totals = getTotals(cart);
  displayTotals(totals);
}
