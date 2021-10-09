import { getElement } from "./assets";

const displayCategory = (arr, element) => {
  element.innerHTML = arr
    .map((category) => {
      const { name } = category;
      let className = name
        .split(" ")
        .join("")
        .split("&")
        .join("");
      return `
        <div class="categories__card card">
          <img src="${oneCategoryImage(
            name
          )}" alt="${name}" class="card__img ${className}_img" />
          <p class="card__title-slider title-slider">${name}</p>
          <p class="card__item-count ${className}_total"> ${oneCategoryTotal(
        name
      )}</p>
      </div>`;
    })
    .join("");
};

function oneCategoryTotal(name) {
  let oneCategory = new XMLHttpRequest();

  if (name == "Amps & Effects") {
    oneCategory.open(
      "GET",
      `http://localhost:3030/products?$limit=25&category.name=Amps %26 Effects`
    );
  } else if (name == "Drums & Percussion") {
    oneCategory.open(
      "GET",
      `http://localhost:3030/products?$limit=25&category.name=Drums %26 Percussion`
    );
  } else {
    oneCategory.open(
      "GET",
      `http://localhost:3030/products?$limit=25&category.name=${name}`
    );
  }

  oneCategory.responseType = "json";
  oneCategory.send();
  oneCategory.onload = function() {
    let className = name
      .split(" ")
      .join("")
      .split("&")
      .join("");
    let result = oneCategory.response;
    let total = result.total;
    let totalElement = getElement(`.${className}_total`);
    totalElement.innerHTML = `${total} items`;
  };
}

function oneCategoryImage(name) {
  let oneCategory = new XMLHttpRequest();
  if (name == "Amps & Effects") {
    oneCategory.open(
      "GET",
      `http://localhost:3030/products?$limit=25&category.name=Amps %26 Effects`
    );
  } else if (name == "Drums & Percussion") {
    oneCategory.open(
      "GET",
      `http://localhost:3030/products?$limit=25&category.name=Drums %26 Percussion`
    );
  } else {
    oneCategory.open(
      "GET",
      `http://localhost:3030/products?$limit=25&category.name=${name}`
    );
  }

  oneCategory.responseType = "json";
  oneCategory.send();
  oneCategory.onload = function() {
    let className = name
      .split(" ")
      .join("")
      .split("&")
      .join("");
    let result = oneCategory.response;
    let image = result.data[1].image;
    let imageElement = getElement(`.${className}_img`);
    imageElement.src = image;
  };
}

export default displayCategory;
