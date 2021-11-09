import { getElement, getStorageItem } from "../assets";
import * as $ from "jquery";
import { getPercent } from "../checkout/displayCartItems";

export const displayDiscount = (coupon) => {
  const total = getElement(".bottom__price");
  const discountText = getElement(".bottom__discount_price");
  const bottom = getElement(".bottom__services_price");
  const newTotal = getElement(".bottom__newtotal");
  let cart = getStorageItem("cart");
  let services = getStorageItem("services");

  // get percent amount
  let number = getPercent(coupon);

  // count discount depending on amount of services
  let sum = services.reduce((total, item) => total + item.name, 0);
  let amount = cart.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  let discount = ((amount + sum) * number).toFixed(2);
  let newAmount = (amount + sum - discount).toFixed(2);

  total.innerHTML = `$${amount.toFixed(2)}`;
  total.style.textDecoration = "line-through";
  bottom.style.textDecoration = "line-through";
  discountText.innerHTML = `- $${discount}`;
  newTotal.innerHTML = `$${newAmount}`;
  addTotalStyles(newTotal);
  $(newTotal).slideDown(300);
};

export const addTotalStyles = (total) => {
  total.style.paddingTop = "15px";
  total.style.borderTop = "1px solid #ececec";
};
