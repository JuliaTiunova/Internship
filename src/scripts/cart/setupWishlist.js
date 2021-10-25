import addToWishlistDOM from "../addtoWishlistDOM";
import { getElement, getStorageItem, setStorageItem } from "../assets";
import { openWishlist } from "../cart";
import { findProduct } from "../store";
import { displayTotal } from "./displayTotal";

const wishlistItemCountDOM = getElement(".wishlist__counter");
const wishlistItemsDOM = getElement(".wishlist__items");
const wishlistTotalDOM = getElement(".subtotal__price_wishlist");

let wishlist = getStorageItem("wishlist");

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

export function setupWishlistFunc() {
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

export function displayWishlistItemCount() {
  const amount = wishlist.reduce((total, wishlistItem) => {
    return (total += wishlistItem.amount);
  }, 0);
  wishlistItemCountDOM.textContent = amount;
}

function removeItemWishlist(id) {
  wishlist = wishlist.filter((wishlistItem) => wishlistItem.id !== id);
}
