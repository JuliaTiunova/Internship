import { getElement, getStorageItem, setStorageItem } from "./assets";
import { openCart, openWishlist } from "./cart";
import { findProduct } from "./store";
import addToCartDOM from "./addtocartDOM";
import addToWishlistDOM from "./addtoWishlistDOM";
import { formatPrice } from "./formatPrice";

const cartItemCountDOM = getElement(".cart__counter");
const cartItemsDOM = getElement(".cart__items");
const cartTotalDOM = getElement(".subtotal__price");

const wishlistItemCountDOM = getElement(".wishlist__counter");
const wishlistItemsDOM = getElement(".wishlist__items");
const wishlistTotalDOM = getElement(".subtotal__price_wishlist");

let cart = getStorageItem("cart");
let wishlist = getStorageItem("wishlist");

export const addToCart = (id, name) => {
  let item = cart.find((cartItem) => cartItem.id == id);
  if (!item) {
    let product = findProduct(id, name);
    console.log(product);
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    addToCartDOM(product);
  } else {
    addAmount(id);
  }
  displayCartItemCount();
  displayTotal(cart, cartTotalDOM);
  setStorageItem("cart", cart);
  openCart();
};

export const addToWishlist = (id) => {
  let item = wishlist.find((wishlistItem) => wishlistItem.id === id);
  if (!item) {
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    wishlist = [...wishlist, product];
    addToWishlistDOM(product);
  } else {
    addAmountlist(id);
  }
  displayWishlistItemCount();
  displayTotal(wishlist, wishlistTotalDOM);
  setStorageItem("wishlist", wishlist);
  openWishlist();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayWishlistItemCount() {
  const amount = wishlist.reduce((total, wishlistItem) => {
    return (total += wishlistItem.amount);
  }, 0);
  wishlistItemCountDOM.textContent = amount;
}

function displayItems(el, func) {
  el.forEach((item) => {
    func(item);
  });
}

function addAmount(id) {
  let newAmount = 0;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function addAmountlist(id) {
  let newAmount = 0;
  wishlist = wishlist.map((wishlistItem) => {
    if (wishlistItem.id === id) {
      newAmount = wishlistItem.amount + 1;
      wishlistItem = { ...wishlistItem, amount: newAmount };
    }
    return wishlistItem;
  });
  return newAmount;
}

function displayTotal(el, domEl) {
  const amount = el.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  domEl.textContent = formatPrice(amount);
}

function removeItemCart(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

function removeItemWishlist(id) {
  wishlist = wishlist.filter((wishlistItem) => wishlistItem.id !== id);
}

function setupCartFunc() {
  cartItemsDOM.addEventListener("click", (e) => {
    const element = e.target;
    const id = e.target.dataset.id;
    if (element.classList.contains("fa-times-circle")) {
      removeItemCart(id);
      element.parentElement.parentElement.remove();
    }
    setStorageItem("cart", cart);
    displayTotal(cart, cartTotalDOM);
    displayCartItemCount();
  });
}

function setupWishlistFunc() {
  wishlistItemsDOM.addEventListener("click", (e) => {
    const element = e.target;
    const id = e.target.dataset.id;
    if (element.classList.contains("fa-times-circle")) {
      removeItemWishlist(id);
      element.parentElement.parentElement.remove();
    }
    setStorageItem("wishlist", wishlist);
    displayTotal(wishlist, wishlistTotalDOM);
    displayWishlistItemCount();
  });
}

const init = () => {
  displayCartItemCount();
  displayWishlistItemCount();
  displayItems(cart, addToCartDOM);
  displayItems(wishlist, addToWishlistDOM);

  setupCartFunc();
  setupWishlistFunc();

  displayTotal(cart, cartTotalDOM);
  displayTotal(wishlist, wishlistTotalDOM);
};

init();
