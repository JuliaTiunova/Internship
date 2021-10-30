import { getElement, getStorageItem, setStorageItem } from "../assets";
import { openCart } from "../cart";
import addToCartDOM from "./addtocartDOM";
import { API_URL } from "../products/displayProd";
import { openRequest } from "../openRequest";
import { displayTotal } from "./displayTotal";
import { displayWishlistItemCount, setupWishlistFunc } from "./setupWishlist";
import { setAmount } from "./setAmount";
import { addValue, amountMap } from "./cartMapping";

const cartItemCountDOM = getElement(".cart__counter");
const cartItemsDOM = getElement(".cart__items");
const cartTotalDOM = getElement(".subtotal__price");

let cart = getStorageItem("cart");

export const addToCart = (id, amount, stockNumber) => {
  let stock = getStorageItem("stock");
  let item = cart.find((cartItem) => cartItem.id == id);
  let product = new XMLHttpRequest();
  let link = `${API_URL}?id=${id}`;
  product.open = openRequest(product, link);
  product.responseType = "json";
  product.send();
  product.onload = function() {
    let element = product.response;
    element = element.data[0];
    element.stock = stockNumber;
    if (amount) {
      element.amount = amount;
    } else {
      element.amount = 1;
    }
    if (!item) {
      cart = [...cart, element];
      addToCartDOM(element);
    } else if (item && element.stock != 0) {
      addAmount(element, amount, false, stock);
      setAmount(element.id, cart, stock);
    }

    if (element.stock != 0) {
      displayTotal(cart, cartTotalDOM);
      setStorageItem("cart", cart);
      displayCartItemCount();
      openCart();
    }
  };
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.innerHTML = amount;
}

function displayItems(el, func) {
  el.forEach((item) => {
    func(item);
  });
}

export function addAmount(item, amount, cartPage) {
  let newAmount = 0;
  amountMap(cart, item.id, amount, newAmount);
  if (cartPage) {
    const total = getElement(".bottom__price");
    displayTotal(cart, total);
  }
  return newAmount;
}

export function reduceAmount(item, cartPage) {
  let newAmount = 0;
  amountMap(cart, item.id, false, newAmount, true);
  if (cartPage) {
    const total = getElement(".bottom__price");
    displayTotal(cart, total);
  }
  return newAmount;
}

function removeItemCart(id) {
  let product = cart.find((item) => (item.id === id ? item : ""));
  cart = cart.filter((cartItem) => cartItem.id !== id);
  addValue(id, product);
}

export function setupCartFunc(section) {
  section.addEventListener("click", (e) => {
    const element = e.target;
    const id = element.dataset.id;
    if (element.classList.contains("fa-times-circle")) {
      let services = getStorageItem("services");
      services = services.filter((ent) => ent.hash != id);
      setStorageItem("services", services);
      removeItemCart(id * 1);

      element.parentElement.parentElement.remove();
    }
    setStorageItem("cart", cart);
    displayTotal(cart, cartTotalDOM);
    displayCartItemCount();
  });
}

export const valueSet = () => {
  const cartButton = document.querySelectorAll(".cart__button");
  cartButton.forEach((button) => {
    let cartItem = cart.find((item) => item.id === button.dataset.id * 1);
    if (cartItem) {
      let number = button.value * 1;
      button.value = number - cartItem.amount;
    }
  });
};

const init = () => {
  displayCartItemCount();
  displayWishlistItemCount();
  displayItems(cart, addToCartDOM);

  setupCartFunc(cartItemsDOM);
  setupWishlistFunc();

  displayTotal(cart, cartTotalDOM);
};

init();
