import { getElement, getStorageItem } from "../assets";
import displayItems from "../../templates/checkoutCart.handlebars";
import Handlebars from "handlebars/runtime";

const services = getStorageItem("services");
const discount = getStorageItem("coupon");

let sum = 0;
let number = 0;

if (services) {
  services.forEach((ent) => {
    sum += ent.name;
  });
}

if (discount) {
  switch (discount) {
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
}

Handlebars.registerHelper("totalCount", function(arr) {
  return findTotal(arr);
});

Handlebars.registerHelper("taxes", function(arr) {
  findTaxes(arr);
  return findTaxes(arr);
});
Handlebars.registerHelper("newTotal", function(arr) {
  let total = findTotal(arr);
  let taxes = findTaxes(arr);
  let shipping = findShipping(arr);
  let rest = (total + sum + shipping) * number;
  total = total + sum + shipping - rest;
  return (total + taxes * 1).toFixed(2);
});

Handlebars.registerHelper("shippingCount", function(arr) {
  let shipping = findShipping(arr);
  return shipping;
});

function findTotal(arr) {
  return arr.reduce((total, item) => total + item.price * item.amount, 0);
}

function findTaxes(arr) {
  let total = findTotal(arr);
  let rest = (total + sum) * number;
  total = total + sum - rest;
  return (total * 0.1).toFixed(2);
}

function findShipping(arr) {
  return arr.reduce((total, item) => total + item.shipping, 0);
}

export const displayCartItems = () => {
  const cart = getStorageItem("cart");
  const bill = getElement(".bill");

  let data = [...cart];
  let newCart = [];
  let total = findTotal(cart);

  newCart.data = data;
  newCart.other = {
    services: sum.toFixed(2),
    discount: ((total + sum) * number).toFixed(2),
  };

  bill.innerHTML = displayItems(newCart);
};
