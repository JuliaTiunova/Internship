import { getElement, getStorageItem } from "../assets";
import { getInnerPrice } from "../cart/getInnerPrice";
import { openMessage, setMessage } from "../cart/openMessage";
import { addAmount, reduceAmount } from "../cart/setupCart";
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
      price = getInnerPrice(price);
      item.addEventListener("click", (e) => {
        let cart = getStorageItem("cart");
        let servicesStorage = getStorageItem("services");
        let parentItem = item.parentElement;
        let id = parentItem.dataset.id * 1;
        let cartItem = cart.find((item) => item.id === id);
        let target = e.target;
        let number = cartItem.stock - cartItem.amount;
        let serviceThis = servicesStorage.find((ent) => ent.hash == id);

        if (target.classList.contains(`${element}__more`)) {
          let count = target.previousElementSibling.innerHTML * 1;
          if (number >= 1) {
            count += 1;

            //set new total for a product services are applied to
            if (serviceThis) {
              item.nextElementSibling.textContent = `$${(
                price * count +
                serviceThis.name
              ).toFixed(2)}`;
            } else {
              item.nextElementSibling.textContent = `$${(price * count).toFixed(
                2
              )}`;
            }

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
            if (serviceThis) {
              item.nextElementSibling.innerHTML = `$${(
                price * count +
                serviceThis.name
              ).toFixed(2)}`;
            } else {
              item.nextElementSibling.innerHTML = `$${(price * count).toFixed(
                2
              )}`;
            }
            reduceAmount(cartItem, true);
          }
        }
      });
    });
  } else {
    let count = 1;
    setMessage(buttonWrapper);
    buttonWrapper.addEventListener("click", (e) => {
      let cart = getStorageItem("cart");
      let stock = getStorageItem("stock");
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
