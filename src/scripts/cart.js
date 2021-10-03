import { getElement } from "./assets";

// i will work on it to avoid repetition

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

const cart = (button) => {
  const cart = getElement(".cart");
  const wishlist = getElement(".wishlist");
  const wishlistFrame = getElement(".wishlist__frame");
  const cartFrame = getElement(".cart__frame");
  const buttonCartClose = getElement(".cart__button-close");
  const top = getElement(".header__wrapper_top");

  button.addEventListener("click", () => {
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
};

const wishlist = (button) => {
  const cart = getElement(".cart");
  const cartFrame = getElement(".cart__frame");
  const wishlist = getElement(".wishlist");
  const wishlistFrame = getElement(".wishlist__frame");
  const buttonwishlistClose = getElement(".wishlist__button-close");
  const top = getElement(".header__wrapper_top");

  button.addEventListener("click", () => {
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
};

export { cart, wishlist, openCart, openWishlist };
