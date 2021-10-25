import { getElement } from "../assets";
import item from "../../templates/cartItem.handlebars";

const cartItemDOM = getElement(".cart__items");

const addToCartDOM = (element) => {
  const article = document.createElement("article");
  article.classList.add("cart__reserve");
  article.classList.add("reserve");
  article.setAttribute("data-id", element.id);
  article.innerHTML = item(element);

  cartItemDOM.appendChild(article);
};

export default addToCartDOM;
