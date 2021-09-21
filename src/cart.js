export default function cart() {
  const buttonCart = document.querySelector(".icon-cart");
  const cart = document.querySelector(".cart");
  const cartFrame = document.querySelector(".cart__frame");
  const buttonCartClose = document.querySelector(".cart__button-close");
  const top = document.querySelector(".header__wrapper_top");

  buttonCart.addEventListener("click", () => {
    cart.classList.toggle("cart-open");
    top.classList.toggle("cart-open");
    cartFrame.classList.toggle("cart-open");
  });

  buttonCartClose.addEventListener("click", () => {
    cart.classList.toggle("cart-open");
    top.classList.toggle("cart-open");
    cartFrame.classList.toggle("cart-open");
  });
}
