import { getElement, getStorageItem, setStorageItem } from "../assets";

const coupons = [
  "musicwave2021",
  "wahwah10",
  "stringsattached20",
  "stringsattached25",
  "guitarfingers30",
  "superduperdiscount",
];

// console.log(`%c${coupons[index]}`, "color: red");

export function displayCoupon() {
  let coupon = getStorageItem("coupon");
  const couponWrapper = getElement(".coupon__name");
  if (coupon.length == 0) {
    let index = Math.floor(Math.random() * 10).toFixed();
    while (index > coupons.length - 1) {
      index = Math.floor(Math.random() * 10).toFixed();
    }
    couponWrapper.innerHTML = coupons[index];
    setStorageItem("coupon", coupons[index]);
  } else {
    couponWrapper.innerHTML = coupon;
  }
}
