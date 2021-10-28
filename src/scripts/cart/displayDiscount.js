import { getElement, getStorageItem } from "../assets";

export const displayDiscount = (coupon) => {
  const total = getElement(".bottom__price");
  const discountText = getElement(".bottom__discount_price");
  const newTotal = getElement(".bottom__newtotal");
  let cart = getStorageItem("cart");

  let number = 0;
  switch (coupon) {
    case "MUSICWAVE2021":
      number = 0.05;
      break;
    case "WAHWAH10":
      number = 0.1;
      break;
    case "STRINGSATTACHED20":
      number = 0.2;
      break;
    case "STRINGSATTACHED25":
      number = 0.25;
      break;
    case "GUITARFINGERS30":
      number = 0.3;
      break;
    case "SUPERDUPERDISCOUNT":
      number = 0.5;
      break;
    default:
      number = 0;
  }

  const amount = cart.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  const discount = (amount * number).toFixed(2);
  const newAmount = (amount - discount).toFixed(2);
  total.innerHTML = `$${amount.toFixed(2)}`;
  total.style.textDecoration = "line-through";
  discountText.innerHTML = `- $${discount}`;
  newTotal.innerHTML = `$${newAmount}`;
  newTotal.style.display = "block";
  newTotal.style.paddingTop = "15px";
  newTotal.style.borderTop = "1px solid #ececec";
};
