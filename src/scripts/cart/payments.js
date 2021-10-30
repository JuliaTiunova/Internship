import { getElement } from "../assets";
import { getInnerPrice } from "./getInnerPrice";

export const totalListener = () => {
  const allDoc = getElement(".shopper");

  let total = findTotal();
  displayParts(total);
  allDoc.onclick = () => {
    total = findTotal();
    displayParts(total);
  };
};
const findTotal = () => {
  const button = getElement(".bottom__price");
  const buttonBottom = getElement(".bottom__newtotal");
  let total;
  if (buttonBottom.innerHTML == "") {
    total = button.innerHTML;
    total = getInnerPrice(total);
  } else {
    total = buttonBottom.innerHTML;
    total = getInnerPrice(total);
  }
  return total;
};

const displayParts = (total) => {
  const totalPay = document.querySelectorAll(".payment__total_value");
  const monthPay = document.querySelectorAll(".payment__month_value");
  const inputs = document.querySelectorAll(".payment__part_value");

  console.log(total);

  totalPay.forEach((item) => {
    item.innerHTML = `$${total}`;
  });

  monthPay.forEach((item) => {
    let input = item.previousElementSibling.firstElementChild.value;
    item.innerHTML = `$${(total / input).toFixed(2)}`;
  });

  inputs.forEach((input) => {
    input.onchange = () => {
      let perMonth = input.nextElementSibling;
      perMonth.innerHTML = `$${(total / input.firstElementChild.value).toFixed(
        2
      )}`;
    };
  });
};
