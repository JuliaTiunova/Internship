import { addToCart, addToWishlist } from "../setupCart";

export const buttonsListenerCart = (element, name) => {
  element.addEventListener("click", function(e) {
    const parent = e.target.parentElement;
    if (e.target.classList.contains("hover__button")) {
      addToCart(e.target.dataset.id, name);
    } else if (parent.classList.contains("box_like")) {
      addToWishlist(parent.dataset.id);
    }
  });
};
