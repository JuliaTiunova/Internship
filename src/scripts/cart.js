import { getElement } from "./assets";

const openCart = () => {
  const cart = getElement(".cart");
  const wishlist = getElement(".wishlist");
  const wishlistFrame = getElement(".wishlist__frame");
  const cartFrame = getElement(".cart__frame");
  const top = getElement(".header__wrapper_top");

  cart.classList.toggle("cart-open");
  top.classList.toggle("cart-open");
  cartFrame.classList.toggle("cart-open");
  if (wishlist.classList.contains("wishlist-open")) {
    wishlist.classList.toggle("wishlist-open");
    top.classList.toggle("wishlist-open");
    wishlistFrame.classList.toggle("wishlist-open");
  }
};

const openWishlist = () => {
  const cart = getElement(".cart");
  const cartFrame = getElement(".cart__frame");
  const wishlist = getElement(".wishlist");
  const wishlistFrame = getElement(".wishlist__frame");
  const top = getElement(".header__wrapper_top");
  wishlist.classList.toggle("wishlist-open");
  top.classList.toggle("wishlist-open");
  wishlistFrame.classList.toggle("wishlist-open");
  if (cart.classList.contains("cart-open")) {
    cart.classList.toggle("cart-open");
    top.classList.toggle("cart-open");
    cartFrame.classList.toggle("cart-open");
  }
};

const cartButton = getElement(".icon-cart");
const cart = getElement(".cart");
const wishlist = getElement(".wishlist");
const wishlistFrame = getElement(".wishlist__frame");
const cartFrame = getElement(".cart__frame");
const buttonCartClose = getElement(".cart__button-close");
const top = getElement(".header__wrapper_top");
const wishlistButton = getElement(".button-like");
const buttonwishlistClose = getElement(".wishlist__button-close");

cartButton.addEventListener("click", () => {
  cart.classList.toggle("cart-open");
  top.classList.toggle("cart-open");
  cartFrame.classList.toggle("cart-open");
  if (wishlist.classList.contains("wishlist-open")) {
    wishlist.classList.toggle("wishlist-open");
    top.classList.toggle("wishlist-open");
    wishlistFrame.classList.toggle("wishlist-open");
  }
});

buttonCartClose.addEventListener("click", () => {
  cart.classList.toggle("cart-open");
  top.classList.toggle("cart-open");
  cartFrame.classList.toggle("cart-open");
});

wishlistButton.addEventListener("click", () => {
  wishlist.classList.toggle("wishlist-open");
  top.classList.toggle("wishlist-open");
  wishlistFrame.classList.toggle("wishlist-open");
  if (cart.classList.contains("cart-open")) {
    cart.classList.toggle("cart-open");
    top.classList.toggle("cart-open");
    cartFrame.classList.toggle("cart-open");
  }
});

buttonwishlistClose.addEventListener("click", () => {
  wishlist.classList.toggle("wishlist-open");
  top.classList.toggle("wishlist-open");
  wishlistFrame.classList.toggle("wishlist-open");
});

export { openCart, openWishlist };
