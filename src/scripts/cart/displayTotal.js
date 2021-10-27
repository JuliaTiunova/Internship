import { getElement, getStorageItem } from "../assets";

export function displayTotal(el, domEl) {
  const amount = el.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  domEl.innerHTML = ` $${amount.toFixed(2)}`;
}

export function displayTotalAfter() {
  const total = getElement(".bottom__price");
  const discountText = getElement(".bottom__discount_price");
  const newTotal = getElement(".bottom__newtotal");
  let cart = getStorageItem("cart");

  const amount = cart.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  total.innerHTML = `$${amount.toFixed(2)}`;
  total.style.textDecoration = "none";
  discountText.innerHTML = `$0`;
  newTotal.style.display = "none";
}
