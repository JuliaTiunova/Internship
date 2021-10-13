import { sliderHeader } from "./slider";

const displayCategory = (arr, element) => {
  element.innerHTML = arr
    .map((category) => {
      const { name, id } = category;
      return `
        <div class="categories__card card">
          <img src="${oneCategoryImage(
            id
          )}" alt="${name}" class="card__img" data-id="${id}"/>
          <a href="./products.html" class="card__title-slider title-slider link">${name}</a>
          <p class="card__item-count" data-id="${id}"> ${oneCategoryTotal(
        id
      )}</p>
      </div>`;
    })
    .join("");
  import("slick-carousel").then(() => {
    sliderHeader();
  });
};

function oneCategoryTotal(id) {
  let oneCategory = new XMLHttpRequest();
  oneCategory.open(
    "GET",
    `http://localhost:3030/products?$limit=25&category.id=${id}`
  );
  oneCategory.responseType = "json";
  oneCategory.send();
  oneCategory.onload = function() {
    let result = oneCategory.response;
    let total = result.total;

    let totalElement = document.querySelectorAll(`.card__item-count`);
    totalElement.forEach((el) =>
      el.dataset.id === id ? (el.innerHTML = `${total} items`) : el
    );
  };
}

function oneCategoryImage(id) {
  let oneCategory = new XMLHttpRequest();

  oneCategory.open(
    "GET",
    `http://localhost:3030/products?$limit=25&category.id=${id}`
  );

  oneCategory.responseType = "json";
  oneCategory.send();
  oneCategory.onload = function() {
    let result = oneCategory.response;
    let image = result.data[1].image;
    let imageElements = document.querySelectorAll(`.card__img`);
    imageElements.forEach((el) =>
      el.dataset.id === id ? (el.src = `${image}`) : el
    );
  };
}

export default displayCategory;
