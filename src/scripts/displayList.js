import { getElement } from "./assets";

const displayList = (categories, element) => {
  if (element.className === "filters__categories") {
    element.innerHTML = categories
      .map((category) => {
        const { name, id } = category;
        return `<button class="category__button" data-id="${id}">${name}</button>`;
      })
      .join("");
    let items = getElement(".category__button");
    items.classList.add("category__button_active");
  } else {
    element.innerHTML = categories
      .map((category) => {
        const { name, id } = category;
        return `<li class="list__item_small item_small" data-id="${id}">${name}</li>`;
      })
      .join("");
    let item = getElement(`.${element.classList[0]} .list__item_small`);
    item.classList.add("item_small_active");
  }
};

export default displayList;
