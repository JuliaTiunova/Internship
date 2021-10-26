import { addToCart } from "../cart/setupCart";
import { addToWishlist } from "../cart/setupWishlist";

export const buttonsListenerCart = (element) => {
  element.addEventListener("click", function(e) {
    const parent = e.target.parentElement;
    if (e.target.classList.contains("cart__button")) {
      // if (e.target.classList.contains("quantity__add")) {
      //   let amount = getElement(".quantity__count");
      //   amount = amount.innerHTML;
      //   amount *= 1;
      //   addToCart(e.target.dataset.id, amount);
      // }
      addToCart(e.target.dataset.id);
    } else if (parent.classList.contains("cart__button")) {
      // if (e.target.classList.contains("quantity__add")) {
      //   let amount = getElement(".quantity__count");
      //   amount = amount.innerHTML;
      //   amount *= 1;
      //   addToCart(e.target.dataset.id, amount);
      // }
      addToCart(parent.dataset.id);
    } else if (parent.classList.contains("box_like")) {
      addToWishlist(parent.dataset.id);
    }
  });
};
