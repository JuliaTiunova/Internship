import { getElement, getStorageItem } from "../assets";
import displayItems from "../../templates/checkoutCart.handlebars";
import Handlebars from "handlebars/runtime";

Handlebars.registerHelper("totalCount", function(arr) {
  return findTotal(arr);
});

Handlebars.registerHelper("taxes", function(arr) {
  return findTaxes(arr);
});
Handlebars.registerHelper("newTotal", function(arr) {
  let total = findTotal(arr);
  let taxes = findTaxes(arr);
  return total + taxes * 1;
});

function findTotal(arr) {
  return arr.reduce((total, item) => total + item.price * item.amount, 0);
}

function findTaxes(arr) {
  let number = findTotal(arr);
  return (number * 0.1).toFixed(2);
}

export const displayCartItems = () => {
  const cart = getStorageItem("cart");
  const bill = getElement(".bill");

  let data = [...cart];
  let newCart = [];
  newCart.data = data;

  bill.innerHTML = displayItems(newCart);
};
