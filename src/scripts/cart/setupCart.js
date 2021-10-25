import { getElement, getStorageItem, setStorageItem } from "../assets";
import { openCart } from "../cart";
import addToCartDOM from "./addtocartDOM";
import addToWishlistDOM from "../addtoWishlistDOM";
import { API_URL } from "../products/displayProd";
import { openRequest } from "../openRequest";
import { displayTotal } from "./displayTotal";
import { displayWishlistItemCount, setupWishlistFunc } from "./setupWishlist";

const cartItemCountDOM = getElement(".cart__counter");
const cartItemsDOM = getElement(".cart__items");
const cartTotalDOM = getElement(".subtotal__price");
// const cartItems = getElement(".shopper__basket");

const wishlistTotalDOM = getElement(".subtotal__price_wishlist");

let cart = getStorageItem("cart");
let wishlist = getStorageItem("wishlist");

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id == id);
  let product = new XMLHttpRequest();
  let link = `${API_URL}?id=${id}`;
  product.open = openRequest(product, link);
  product.responseType = "json";
  product.send();
  product.onload = function() {
    let element = product.response;
    element = element.data[0];
    element.amount = 1;
    if (!item) {
      cart = [...cart, element];
      addToCartDOM(element);
    } else {
      addAmount(element);
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

function addAmount(item) {
  let newAmount = 0;
  cart = cart.map((cartItem) => {
    if (cartItem.id === item.id) {
      newAmount = cartItem.amount + 1;
      cartItem.amount = newAmount;
    }
    return cartItem;
  });
  return newAmount;
}

function removeItemCart(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

function setupCartFunc(section) {
  section.addEventListener("click", (e) => {
    const element = e.target;
    const id = element.dataset.id;
    console.log(id);
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
  // setupCartFunc(cartItems);
  setupWishlistFunc();

  displayTotal(cart, cartTotalDOM);
  displayTotal(wishlist, wishlistTotalDOM);
};

init();
