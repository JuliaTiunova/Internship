import { getElement } from "../assets";
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
      addToCart(e.target.dataset.id, amount);
    } else if (e.target.classList.contains("cart__button")) {
      addToCart(e.target.dataset.id);
    } else if (parent.classList.contains("cart__button")) {
      addToCart(parent.dataset.id);
    } else if (parent.classList.contains("box_like")) {
      addToWishlist(parent.dataset.id);
    }
  });
};
