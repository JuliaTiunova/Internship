import { getElement, getStorageItem, setStorageItem } from "../assets";
import renderMessage from "../../templates/checkoutMessage.handlebars";

const checkoutWrapper = getElement(".checkout");
let orderStorage = getStorageItem("order");

function clearStorage() {
  localStorage.removeItem("coupon");
  localStorage.removeItem("cart");
  localStorage.removeItem("services");
  localStorage.removeItem("stock");
  document.location.reload();
  checkoutWrapper.innerHTML = renderMessage();
}

export const setOrder = (order) => {
  const orderButton = getElement(".order__button");
  const orderButtonBack = getElement(".order__button_back");
  const orderWrapper = getElement(".order__wrapper");

  orderButton.onclick = (e) => {
    e.preventDefault();

    if (orderStorage.length > 0) {
      orderStorage = [...orderStorage, order];
      setStorageItem("order", orderStorage);
      clearStorage();
    } else {
      setStorageItem("order", order);
      clearStorage();
    }
  };

  orderButtonBack.onclick = (e) => {
    e.preventDefault();
    orderWrapper.classList.remove("open");
  };
};
