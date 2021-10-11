// import { formatPrice } from "./formatPrice";
import { getElement } from "./assets";
import { addToCart, addToWishlist } from "./setupCart";
import * as $ from "jquery";

const displayMain = (slider) => {
  slider.className = slider.classList[0];
  let item = getElement(".item_small_active");
  let text = item.textContent;
  let productsAll = new XMLHttpRequest();
  if (text === "Amps & Effects") {
    productsAll.open(
      "GET",
      `http://localhost:3030/products?$limit=25&category.name=Amps %26 Effects`
    );
  } else if (text === "Drums & Percussion") {
    productsAll.open(
      "GET",
      `http://localhost:3030/products?$limit=25&category.name=Drums %26 Percussion`
    );
  } else {
    productsAll.open(
      "GET",
      `http://localhost:3030/products?$limit=25&category.name=${text}`
    );
  }
  productsAll.responseType = "json";
  productsAll.send();
  productsAll.onload = function() {
    if (productsAll.status == 200) {
      let info = productsAll.response;
      let arr = info.data;
      slider.innerHTML = arr.map((product) => {
        const { id, name, price, image } = product;
        return `<article class="slider__product product">
      <div class="product__wrapper">
        <div class="product__img_wrapper">
        <img class="product__img" src="${image}" alt="${name}" />
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
        <p class="product__price">$${price}</p>
      </div>
    </article>`;
      });

      if (slider.className === "arrival__slider") {
        import("slick-carousel").then(() => {
          $(".arrival__slider").slick({
            slidesToShow: 5,
            slidesToScroll: 2,
            cssEase: "linear",
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: true,
            responsive: [
              {
                breakpoint: 1920,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1400,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: false,
                },
              },
            ],
          });
        });
      }

      if (slider.className === "feature__products") {
        $(".feature__products").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          cssEase: "linear",
          autoplay: true,
          autoplaySpeed: 4000,
          arrows: true,
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 578,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
    }
  };
};

const buttonListener = (categoriesDOM, slider) => {
  const listItem = document.querySelectorAll(`.list__item_small`);
  // const list = getElement(".arrival__list");
  categoriesDOM.addEventListener("click", (e) => {
    const element = e.target;
    listItem.forEach((item) =>
      item.classList.contains("item_small_active")
        ? item.classList.remove("item_small_active")
        : item
    );
    element.classList.add("item_small_active");
    displayMain(slider);
  });
};

const display = (products, element, filters) => {
  const article = (id, name, price) => {
    //   if (company === "ikea") {
    //     return `<article class="slider__product product">
    //   <div class="product__wrapper product_sale">
    //     <div class="product__img_wrapper">
    //     <img class="product__img" src="img/img.jpg" alt="vegetables" />
    //     <div class="product__hover hover">
    //       <button class="hover__box box_like button_small" data-id="${id}"><i class="icon-like"></i></button>
    //       <div class="hover__bottom">
    //           <div class="hover__box box_reload"><i class="icon-reload"></i></div>
    //           <button class="hover__button button_small" data-id="${id}"><i class="hover__button_img icon-cart" src="img/cart.png" alt="cart"></i>Add to cart</button>
    //           <a href="product.html?id=${id}" class="hover__box box_search box__link link"><i class="icon-search"></i></a>
    //       </div>
    //     </div>
    //     </div>
    //     <div class="product__ratings ratings"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i><i class="far fa-star"></i></div>
    //     <p class="product__name">${name}</p>
    //     <p class="product__price">${formatPrice(price)} <span>${formatPrice(
    //       price + price * 0.2
    //     )}</span></p>
    //   </div>
    // </article>`;
    //   } else if (company === "marcos") {
    //     return `<article class="slider__product product">
    //     <div class="product__wrapper product_new">
    //       <div class="product__img_wrapper">
    //       <img class="product__img" src="img/img.jpg" alt="vegetables" />
    //       <div class="product__hover hover">
    //         <button class="hover__box box_like button_small" data-id="${id}"><i class="icon-like"></i></button>
    //         <div class="hover__bottom">
    //             <div class="hover__box box_reload"><i class="icon-reload"></i></div>
    //             <button class="hover__button button_small" data-id="${id}"><i class="hover__button_img icon-cart" src="img/cart.png" alt="cart"></i>Add to cart</button>
    //             <a href="product.html?id=${id}" class="hover__box box_search box__link link"><i class="icon-search"></i></a>
    //         </div>
    //       </div>
    //       </div>
    //       <div class="product__ratings ratings"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i><i class="far fa-star"></i></div>
    //       <p class="product__name">${name}</p>
    //       <p class="product__price">${formatPrice(price)} <span>${formatPrice(
    //       price + price * 0.2
    //     )}</span></p>
    //     </div>
    //   </article>`;
    //   } else {
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
      <p class="product__price">${price}</p>
    </div>
  </article>`;
    // }
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

  if (element.classList.contains("deals__products")) {
    element.innerHTML = products
      .map((product) => {
        const { id, name, price } = product;
        //       if (company === "ikea") {
        //         return `<article class="products__product product">
        //   <div class="product__wrapper product_sale product_sale_deals product_new product_sale_new_deals">
        //     <div class="product__img_wrapper">
        //     <img class="product__img product__img_deals" src="img/img.jpg" alt="vegetables" />
        //     <div class="product__hover hover">
        //       <button class="hover__box box_like button_small" data-id="${id}"><i class="icon-like"></i></button>
        //       <div class="hover__bottom">
        //           <div class="hover__box box_reload"><i class="icon-reload"></i></div>
        //           <button class="hover__button button_small" data-id="${id}"><i class="hover__button_img icon-cart" src="img/cart.png" alt="cart"></i>Add to cart</button>
        //           <a href="product.html?id=${id}" class="hover__box box_search box__link link"><i class="icon-search"></i></a>
        //       </div>
        //     </div>
        //     </div>
        //     <div class="product__ratings ratings"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half"></i><i class="far fa-star"></i></div>
        //     <p class="product__name">${name}</p>
        //     <p class="product__price">${formatPrice(price)} <span>${formatPrice(
        //           price + price * 0.2
        //         )}</span></p>
        //   </div>
        // </article>`;
        //       } else {
        return `<article class="products__product product">
    <div class="product__wrapper product_sale product_sale_deals">
      <div class="product__img_wrapper">
      <img class="product__img product__img_deals" src="img/img.jpg" alt="vegetables" />
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
      <p class="product__price">${price - price * 0.2} <span>${price}</span></p>
    </div>
  </article>`;
        // }
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

    if (filters) return;

    buttonsListener(element);
  }
};

export { display, displayMain, buttonListener };
