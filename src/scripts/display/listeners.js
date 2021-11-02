import { getElement } from "../assets";
import { displayOutOfStock } from "../cart/outStockDisplay";
import { addToCart } from "../cart/setupCart";
import { addToWishlist } from "../cart/setupWishlist";

export const buttonsListenerCart = (element) => {
  element.addEventListener("click", function(e) {
    const parent = e.target.parentElement;
    if (
      e.target.classList.contains("quantity__add") &&
      e.target.classList.contains("cart__button")
    ) {
      let amount = getElement(".quantity__count");
      amount = amount.innerHTML;
      amount *= 1;
      let stock = e.target.value * 1;
      if (stock != 0) {
        addToCart(e.target.dataset.id, amount, stock);
        e.target.value = e.target.value * 1 - amount;
      } else {
        displayOutOfStock(e.target.dataset.id);
      }
    } else if (e.target.classList.contains("cart__button")) {
      let stock = e.target.value * 1;
      if (stock != 0) {
        addToCart(e.target.dataset.id, false, stock);
        e.target.value = stock - 1;
      } else {
        displayOutOfStock(e.target.dataset.id);
      }
    } else if (parent.classList.contains("cart__button")) {
      if (parent.value != 0) {
        addToCart(parent.dataset.id, false, parent.value * 1);
        parent.value = parent.value * 1 - 1;
      } else {
        displayOutOfStock(parent.dataset.id);
      }
    } else if (parent.classList.contains("box_like")) {
      addToWishlist(parent.dataset.id);
    }
  });
};
