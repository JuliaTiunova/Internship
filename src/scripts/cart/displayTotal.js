import { getElement } from "../assets";
import * as $ from "jquery";

export function displayTotal(el, domEl) {
  const amount = el.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  domEl.innerHTML = ` $${amount.toFixed(2)}`;
}

export function displayTotals(item) {
  const total = getElement(".bottom__price");
  const discountText = getElement(".bottom__discount_price");
  const newTotal = getElement(".bottom__newtotal");
  const bottom = getElement(".bottom__services_price");
  total.innerHTML = `$${item.total.toFixed(2)}`;
  item.serviceTotal
    ? (bottom.innerHTML = `+$${item.serviceTotal.toFixed(2)}`)
    : (bottom.innerHTML = `$0.00`);
  item.discount
    ? (discountText.innerHTML = `-$${item.discount.toFixed(2)}`)
    : (discountText.innerHTML = `$0.00`);
  if (!item.serviceTotal && !item.discount) {
    $(newTotal).hide();
    total.style.textDecoration = "none";
  } else if (item.serviceTotal) {
    newTotal.innerHTML = `$${item.newTotal.toFixed(2)}`;
    $(newTotal).slideDown(200);
  }
  if (!item.discount) {
    total.style.textDecoration = "none";
    bottom.style.textDecoration = "none";
    discountText.innerHTML = `$0.00`;
  } else {
    newTotal.innerHTML = `$${item.newTotal.toFixed(2)}`;
    $(newTotal).slideDown(200);
  }
}
