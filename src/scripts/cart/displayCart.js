import { getElement, getStorageItem } from "../assets";
import cartDisplay from "../../templates/cartDisplay.handlebars";
import Handlebars from "handlebars/runtime";
import { displayTotal } from "./displayTotal";

Handlebars.registerHelper("times", function(a, b) {
  return (a * b).toFixed(2);
});

export function displayCart() {
  const cartWrapper = getElement(".shopper__basket");
  const total = getElement(".bottom__price");
  let cart = getStorageItem("cart");
  cart.data = cart;
  cartWrapper.innerHTML = cartDisplay(cart);
  displayTotal(cart, total);
}
