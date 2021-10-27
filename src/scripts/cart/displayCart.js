import { getElement, getStorageItem } from "../assets";
import cartDisplay from "../../templates/cartDisplay.handlebars";
import Handlebars from "handlebars/runtime";
import { displayTotal } from "./displayTotal";
import { displayDiscount } from "./displayDiscount";

Handlebars.registerHelper("times", function(a, b) {
  return (a * b).toFixed(2);
});

export function displayCart() {
  const cartWrapper = getElement(".shopper__basket");
  const total = getElement(".bottom__price");
  const discount = getStorageItem("coupon");
  let cart = getStorageItem("cart");
  cart.data = cart;
  cartWrapper.innerHTML = cartDisplay(cart);
  if (discount.length == 0) {
    displayTotal(cart, total);
  } else {
    displayDiscount(discount.toUpperCase());
  }
}
