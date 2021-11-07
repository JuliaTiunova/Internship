import { getElement, getStorageItem, setStorageItem } from "../assets";
import renderMessage from "../../templates/checkoutMessage.handlebars";

const checkoutWrapper = getElement(".checkout");
const orderWrapper = getElement(".order__wrapper");
const cartItemCountDOM = getElement(".cart__counter");
const cartButton = document.querySelectorAll(".button-cart");

// after order is formed, wait for confirmation

// for if confirmed: cleare storage, display "thank you" message, disable side-bar cart button
function clearStorage() {
  localStorage.removeItem("coupon");
  localStorage.removeItem("cart");
  localStorage.removeItem("services");
  localStorage.removeItem("stock");
  checkoutWrapper.innerHTML = renderMessage();
  checkoutWrapper.scrollIntoView();
  const cart = getStorageItem("cart");
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.innerHTML = amount;

  orderWrapper.classList.remove("open");
  cartButton.forEach((button) => {
    button.style.pointerEvents = "none";
  });
}

export const setOrder = (orders) => {
  const orderButton = getElement(".order__button");
  const orderButtonBack = getElement(".order__button_back");

  orderButton.onclick = (e) => {
    let orderStorage = getStorageItem("order");
    e.preventDefault();

    if (orderStorage.length > 0) {
      orderStorage = [...orderStorage, orders];
      setStorageItem("order", orderStorage);
      clearStorage();
    } else {
      setStorageItem("order", orders);
      clearStorage();
    }
  };

  orderButtonBack.onclick = (e) => {
    e.preventDefault();
    orderWrapper.classList.remove("open");
  };
};
