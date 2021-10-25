import { getElement, getStorageItem, setStorageItem } from "../assets";
import { displayTotal } from "../cart/displayTotal";

let cart = getStorageItem("cart");

export function countListener(element) {
  const counterButton = document.querySelectorAll(
    `.${element}__button_wrapper`
  );

  const buttonWrapper = getElement(`.${element}__button_wrapper`);
  const counter = getElement(`.${element}__count`);

  if (element == "basket") {
    const total = getElement(".bottom__price");
    counterButton.forEach((item) => {
      let price = item.previousElementSibling.innerHTML;
      price = price.split("$").join("") * 1;
      item.addEventListener("click", (e) => {
        let parentItem = item.parentElement;
        let cartItem = cart.find(
          (item) => item.id === parentItem.dataset.id * 1
        );
        let target = e.target;
        if (target.classList.contains(`${element}__more`)) {
          let count = target.previousElementSibling.innerHTML * 1;
          count += 1;
          item.nextElementSibling.textContent = `$${(price * count).toFixed(
            2
          )}`;
          target.previousElementSibling.innerHTML = count;
          addAmount(cartItem);
        } else if (target.classList.contains(`${element}__less`)) {
          let count = target.nextElementSibling.innerHTML * 1;
          if (count == 1) {
            count = 1;
          } else {
            count -= 1;
          }

          target.nextElementSibling.innerHTML = count;
          item.nextElementSibling.innerHTML = `$${(price * count).toFixed(2)}`;
          reduceAmount(cartItem);
        }

        setStorageItem("cart", cart);
        displayTotal(cart, total);
      });
    });
  } else {
    let count = 1;
    buttonWrapper.addEventListener("click", (e) => {
      let target = e.target;
      if (target.classList.contains(`${element}__more`)) {
        count += 1;
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

function addAmount(item) {
  let newAmount = 0;
  cart = cart.map((cartItem) => {
    if (cartItem.id === item.id) {
      newAmount = cartItem.amount + 1;
      cartItem.amount = newAmount;
    }
    return cartItem;
  });
  return newAmount;
}

function reduceAmount(item) {
  let newAmount = 0;
  cart = cart.map((cartItem) => {
    if (cartItem.id === item.id) {
      newAmount = cartItem.amount - 1;
      if (newAmount === 0) {
        newAmount = 1;
      }
      cartItem.amount = newAmount;
    }
    return cartItem;
  });
  return newAmount;
}
