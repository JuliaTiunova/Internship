import { getElement, getStorageItem, setStorageItem } from "../assets";
import { openCart } from "../cart";
import addToCartDOM from "./addtocartDOM";
import addToWishlistDOM from "../addtoWishlistDOM";
import { API_URL } from "../products/displayProd";
import { openRequest } from "../openRequest";
import { displayTotal } from "./displayTotal";
import { displayWishlistItemCount, setupWishlistFunc } from "./setupWishlist";
import { setAmount } from "./setAmount";

const cartItemCountDOM = getElement(".cart__counter");
const cartItemsDOM = getElement(".cart__items");
const cartTotalDOM = getElement(".subtotal__price");

const wishlistTotalDOM = getElement(".subtotal__price_wishlist");

let cart = getStorageItem("cart");
let wishlist = getStorageItem("wishlist");

export const addToCart = (id, amount) => {
  let item = cart.find((cartItem) => cartItem.id == id);
  let product = new XMLHttpRequest();
  let link = `${API_URL}?id=${id}`;
  product.open = openRequest(product, link);
  product.responseType = "json";
  product.send();
  product.onload = function() {
    let element = product.response;
    element = element.data[0];
    if (amount) {
      element.amount = amount;
    } else {
      element.amount = 1;
    }
    if (!item) {
      cart = [...cart, element];
      addToCartDOM(element);
    } else {
      addAmount(element, amount);
      setAmount(element.id, cart);
    }
    displayTotal(cart, cartTotalDOM);
    setStorageItem("cart", cart);
    displayCartItemCount();
    openCart();
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
  cart = cart.map((cartItem) => {
    if (cartItem.id === item.id) {
      if (amount) {
        newAmount = cartItem.amount + amount;
      } else {
        newAmount = cartItem.amount + 1;
      }
      cartItem.amount = newAmount;
    }
    return cartItem;
  });
  if (cartPage) {
    const total = getElement(".bottom__price");
    displayTotal(cart, total);
  }

  return newAmount;
}

export function reduceAmount(item, cartPage) {
  let newAmount = 0;
  cart = cart.map((cartItem) => {
    if (cartItem.id === item.id) {
      newAmount = cartItem.amount - 1;
      if (newAmount === 0) {
        newAmount = 1;
      }
      cartItem.amount = newAmount;
    }
    return cartItem;
  });
  if (cartPage) {
    const total = getElement(".bottom__price");
    displayTotal(cart, total);
  }

  return newAmount;
}

function removeItemCart(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

export function setupCartFunc(section) {
  section.addEventListener("click", (e) => {
    const element = e.target;
    const id = element.dataset.id;
    if (element.classList.contains("fa-times-circle")) {
      removeItemCart(id * 1);
      element.parentElement.parentElement.remove();
    }
    setStorageItem("cart", cart);
    displayTotal(cart, cartTotalDOM);
    displayCartItemCount();
  });
}

const init = () => {
  displayCartItemCount();
  displayWishlistItemCount();
  displayItems(cart, addToCartDOM);
  displayItems(wishlist, addToWishlistDOM);

  setupCartFunc(cartItemsDOM);
  setupWishlistFunc();

  displayTotal(cart, cartTotalDOM);
  displayTotal(wishlist, wishlistTotalDOM);
};

init();
