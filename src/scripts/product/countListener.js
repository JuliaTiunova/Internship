import { getElement, getStorageItem } from "../assets";
import { openMessage, setMessage } from "../cart/openMessage";
import { addAmount, reduceAmount } from "../cart/setupCart";

let cart = getStorageItem("cart");
let stock = getStorageItem("stock");

export function countListener(element) {
  const counterButton = document.querySelectorAll(
    `.${element}__button_wrapper`
  );
  const buttonWrapper = getElement(`.${element}__button_wrapper`);
  const counter = getElement(`.${element}__count`);

  if (element == "basket") {
    counterButton.forEach((item) => {
      setMessage(item);
      let price = item.previousElementSibling.innerHTML;
      price = price.split("$").join("") * 1;
      item.addEventListener("click", (e) => {
        let parentItem = item.parentElement;
        let id = parentItem.dataset.id * 1;
        let cartItem = cart.find((item) => item.id === id);
        let target = e.target;
        let number = cartItem.stock - cartItem.amount;
        if (target.classList.contains(`${element}__more`)) {
          let count = target.previousElementSibling.innerHTML * 1;
          if (number > count) {
            count += 1;
            item.nextElementSibling.textContent = `$${(price * count).toFixed(
              2
            )}`;
            target.previousElementSibling.innerHTML = count;
            addAmount(cartItem, false, true);
          } else {
            openMessage(id);
          }
        } else if (target.classList.contains(`${element}__less`)) {
          let count = target.nextElementSibling.innerHTML * 1;

          if (count == 1) {
            count = 1;
          } else {
            count -= 1;
            target.nextElementSibling.innerHTML = count;
            item.nextElementSibling.innerHTML = `$${(price * count).toFixed(
              2
            )}`;
            reduceAmount(cartItem, true);
          }
        }
      });
    });
  } else {
    let count = 1;
    setMessage(buttonWrapper);
    buttonWrapper.addEventListener("click", (e) => {
      let id = buttonWrapper.nextElementSibling.dataset.id * 1;
      let cartItem = cart.find((item) => item.id === id);
      let stockItem = stock.find((item) => item.id === id);
      let target = e.target;
      let number = 0;
      if (cartItem) {
        number = cartItem.stock - cartItem.amount;
      } else {
        number = stockItem.stock;
      }
      if (target.classList.contains(`${element}__more`)) {
        if (number > count) {
          count += 1;
        } else {
          openMessage(id);
        }
      } else if (target.classList.contains(`${element}__less`)) {
        if (count == 1) {
          count = 1;
        } else {
          count -= 1;
        }
      }
      counter.innerHTML = count;
    });
  }
}
