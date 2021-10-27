import { getElement, setStorageItem } from "../assets";
import { displayCoupon } from "./coupons";

export const updateCoupon = () => {
  const reload = getElement(".coupon__button");
  reload.onclick = () => {
    const input = getElement(".coupon__input");
    if (input.value) {
      input.value = "";
    }
    setStorageItem("coupon", []);
    displayCoupon();
  };
};
