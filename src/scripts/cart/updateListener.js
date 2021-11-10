import { getElement, getStorageItem } from "../assets";
import { getTotals } from "./getTotals";
import { displayTotals } from "./displayTotal";
import { validateCoupon } from "./validation";

// listen to update cart button
export const updateListener = () => {
  const update = getElement(".bottom__button_update");

  update.onclick = () => {
    const cart = getStorageItem("cart");
    const storage = getStorageItem("coupon");
    const input = getElement(".coupon__input");
    const coupon = input.value.toUpperCase();
    if (coupon) {
      validateCoupon(coupon, input);
    } else if (coupon == "" && storage.length == 0) {
      const totals = getTotals(cart);
      displayTotals(totals);
    } else {
      validateCoupon(storage, input);
    }
  };
};
