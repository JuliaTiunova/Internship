import { getElement, getStorageItem } from "../assets";
import { displayTotalAfter } from "./displayTotal";
import { validateCoupon } from "./validation";

export const updateListener = () => {
  const update = getElement(".bottom__button_update");
  const storage = getStorageItem("coupon");
  update.onclick = () => {
    const input = getElement(".coupon__input");
    const coupon = input.value;
    if (coupon) {
      validateCoupon(coupon, input);
    } else if (coupon == "" && storage.length == 0) {
      displayTotalAfter();
    }
  };
};
