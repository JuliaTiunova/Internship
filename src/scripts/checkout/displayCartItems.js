import { getElement, getStorageItem } from "../assets";
import displayItems from "../../templates/checkoutCart.handlebars";
import Handlebars from "handlebars/runtime";

// display cart Items, get all totals for "bill" section

const services = getStorageItem("services");
const discount = getStorageItem("coupon");

let sum = 0;
let number = 0;

if (services) {
  services.forEach((ent) => {
    sum += ent.name;
  });
}

export function getPercent(coupon) {
  const coupon2Mapping = {
    MUSICWAVE2021: 0.05,
    WAHWAH10: 0.1,
    STRINGSATTACHED20: 0.2,
    STRINGSATTACHED25: 0.25,
    GUITARFINGERS30: 0.3,
    SUPERDUPERDISCOUNT: 0.5,
  };

  return coupon2Mapping[coupon] ?? 0;
}

if (discount) {
  number = getPercent(discount);
}

Handlebars.registerHelper("totalCount", function(arr) {
  return findTotal(arr);
});

Handlebars.registerHelper("taxes", function(arr) {
  findTaxes(arr);
  return findTaxes(arr);
});

Handlebars.registerHelper("newTotal", function(arr) {
  let total = Number(findTotal(arr));
  let taxes = Number(findTaxes(arr));
  let shipping = findShipping(arr);
  let rest = (total + sum + shipping) * number;
  total = total + sum + shipping - rest;
  return (total + taxes).toFixed(2);
});

Handlebars.registerHelper("shippingCount", function(arr) {
  let shipping = findShipping(arr);
  return shipping;
});

Handlebars.registerHelper("countDiscount", function(arr) {
  let total = Number(findTotal(arr));
  return ((total + sum) * number).toFixed(2);
});

function findTotal(arr) {
  let total = arr.reduce((total, item) => total + item.price * item.amount, 0);
  return total.toFixed(2);
}

function findTaxes(arr) {
  let total = Number(findTotal(arr));
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

  newCart.data = data;
  newCart.other = {
    services: sum.toFixed(2),
  };

  bill.innerHTML = displayItems(newCart);
};
