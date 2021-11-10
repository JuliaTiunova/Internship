import { getElement } from "../assets";
import * as $ from "jquery";

export function displayTotal(el, domEl) {
  const amount = el.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  domEl.innerHTML = ` $${amount.toFixed(2)}`;
}

export function displayTotals({ total, serviceTotal, discount, newTotal }) {
  const totalMain = getElement(".bottom__price");
  const discountText = getElement(".bottom__discount_price");
  const newTotalMain = getElement(".bottom__newtotal");
  const bottom = getElement(".bottom__services_price");
  const bottomWrapper = getElement(".bottom__services_wrapper");
  totalMain.innerHTML = `$${total.toFixed(2)}`;
  serviceTotal
    ? (bottom.innerHTML = `+$${serviceTotal.toFixed(2)}`)
    : (bottom.innerHTML = `$0.00`);
  discount
    ? (discountText.innerHTML = `-$${discount.toFixed(2)}`)
    : (discountText.innerHTML = `$0.00`);
  if (!serviceTotal && !discount) {
    $(newTotalMain).hide();
  }
  if (!serviceTotal) {
    $(bottomWrapper).hide(200);
  } else {
    newTotalMain.innerHTML = `$${newTotal.toFixed(2)}`;
    $(bottomWrapper).show(200);
    $(newTotalMain).slideDown(200);
  }
  if (!discount) {
    totalMain.style.textDecoration = "none";
    bottom.style.textDecoration = "none";
    discountText.innerHTML = `$0.00`;
  } else {
    totalMain.style.textDecoration = "line-through";
    bottom.style.textDecoration = "line-through";
    addTotalStyles(newTotalMain);
    newTotalMain.innerHTML = `$${newTotal.toFixed(2)}`;
    $(newTotalMain).slideDown(200);
  }
}

function addTotalStyles(total) {
  total.style.paddingTop = "15px";
  total.style.borderTop = "1px solid #ececec";
}
