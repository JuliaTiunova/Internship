import { formatPrice } from "./formatPrice";
import { addToCart, addToWishlist } from "./setupCart";

const display = (products, element) => {
  const article = (id, name, price) => {
    return `<article class="slider__product product">
    <div class="product__wrapper">
      <div class="product__img_wrapper">
      <img class="product__img" src="img/img.jpg" alt="vegetables" />
      <div class="product__hover hover">
        <button class="hover__box box_like button_small" data-id="${id}"><i class="icon-like"></i></button>
        <div class="hover__bottom">
            <div class="hover__box box_reload"><i class="icon-reload"></i></div>
            <button class="hover__button button_small" data-id="${id}"><i class="hover__button_img icon-cart" src="img/cart.png" alt="cart"></i>Add to cart</button>
            <a href="product.html?id=${id}" class="hover__box box_search box__link link"><i class="icon-search"></i></a>
        </div>
      </div>
      </div>
      <div class="product__ratings ratings"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i><i class="far fa-star"></i></div>
      <p class="product__name">${name}</p>
      <p class="product__price">${formatPrice(price)} <span>$18.0</span></p>
    </div>
  </article>`;
  };

  const buttonsListener = (element) => {
    element.addEventListener("click", function(e) {
      const parent = e.target.parentElement;
      if (e.target.classList.contains("hover__button")) {
        addToCart(e.target.dataset.id);
      } else if (parent.classList.contains("box_like")) {
        addToWishlist(parent.dataset.id);
      }
    });
  };

  if (element.classList.contains("feature__content")) {
    element.innerHTML = `<div class="feature__poster">
    <div class="poster__content ">
      <div class="poster_sale"><p class="sale__text">New arrivals</p></div>
      <h2 class="poster__title title2">50% UP</h2>
      <a href="#" class="poster__link link__white link">SHOP NOW</a>
    </div>
  </div>`;
    element.innerHTML += products
      .map((product) => {
        const { id, name, price } = product;
        return article(id, name, price);
      })
      .join("");
    buttonsListener(element);
  } else {
    element.innerHTML = products
      .map((product) => {
        const { id, name, price } = product;
        return article(id, name, price);
      })
      .join("");
    buttonsListener(element);
  }
};

export default display;
