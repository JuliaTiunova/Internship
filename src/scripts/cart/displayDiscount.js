import { getElement, getStorageItem } from "../assets";
import * as $ from "jquery";
import { getInnerPrice } from "./getInnerPrice";

export const displayDiscount = (coupon) => {
  const total = getElement(".bottom__price");
  const discountText = getElement(".bottom__discount_price");
  const bottom = getElement(".bottom__services_price");
  const newTotal = getElement(".bottom__newtotal");
  let cart = getStorageItem("cart");

  // get percent amount
  let number = 0;
  switch (coupon) {
    case "MUSICWAVE2021":
      number = 0.05;
      break;
    case "WAHWAH10":
      number = 0.1;
      break;
    case "STRINGSATTACHED20":
      number = 0.2;
      break;
    case "STRINGSATTACHED25":
      number = 0.25;
      break;
    case "GUITARFINGERS30":
      number = 0.3;
      break;
    case "SUPERDUPERDISCOUNT":
      number = 0.5;
      break;
    default:
      number = 0;
  }

  // count discount depending on amount of services
  let services = bottom.innerHTML;
  services = getInnerPrice(services);
  let amount = cart.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  let discount = ((amount + services) * number).toFixed(2);
  let newAmount = (amount + services - discount).toFixed(2);

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
