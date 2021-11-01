import { getElement, getStorageItem } from "../assets";
import * as $ from "jquery";

export function displayTotal(el, domEl) {
  const amount = el.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  domEl.innerHTML = ` $${amount.toFixed(2)}`;
}

export function displayTotalAfter() {
  const total = getElement(".bottom__price");
  const discountText = getElement(".bottom__discount_price");
  const newTotal = getElement(".bottom__newtotal");
  const bottom = getElement(".bottom__services_price");
  let services = getStorageItem("services");
  let cart = getStorageItem("cart");

  const amount = cart.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  total.innerHTML = `$${amount.toFixed(2)}`;

  total.style.textDecoration = "none";
  bottom.style.textDecoration = "none";
  discountText.innerHTML = `$0`;
  if (services.length == 0) {
    $(newTotal).slideUp(300);
  }
}
