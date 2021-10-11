import { getElement } from "./assets";

const displayList = (categories, element) => {
  element.innerHTML = categories
    .map((category) => {
      const { name } = category;
      return `<li class="list__item_small item_small">${name}</li>`;
    })
    .join("");
  let item = getElement(`.${element.classList[0]} .list__item_small`);
  item.classList.add("item_small_active");
};

export default displayList;
