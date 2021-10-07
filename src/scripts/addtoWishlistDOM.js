import { getElement } from "./assets";
import { formatPrice } from "./formatPrice";

const wishlistItemDOM = getElement(".wishlist__items");

const addToWishlistDOM = ({ id, name, price, amount }) => {
  const article = document.createElement("article");
  article.classList.add("wishlist__reserve");
  article.classList.add("reserve");
  article.setAttribute("data-id", id);
  article.innerHTML = `
      <img class="reserve__img" src="img/img.jpg" alt="item">
      <div class="reserve__info">
        <p class="reserve__name">${name}</p>
        <div class="reserve__count"><span class="reserve__count_price" data-id="${id}">${amount}x</span> ${formatPrice(
    price
  )}</div>
      </div>
      <button class="reserve__button"><i class="far fa-times-circle" data-id="${id}"></i></button>`;

  wishlistItemDOM.appendChild(article);
};

export default addToWishlistDOM;
