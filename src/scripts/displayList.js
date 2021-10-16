import { getElement } from "./assets";
import button from "../templates/button.handlebars";
import list from "../templates/list.handlebars";

const displayList = (categories, element) => {
  if (element.className === "filters__categories") {
    element.innerHTML = button(categories);
    let item = getElement(".category__button");
    let items = document.querySelectorAll(".category__button");

    categories.data.forEach((element) => {
      if (element.subCategories.length === 0) {
        items.forEach((el) => {
          if (el.textContent === element.name + " " + "3") {
            el.classList.add("nospan");
          }
        });
      }
    });
    item.classList.add("category__button_active");
  } else {
    element.innerHTML = list(categories);
    let item = getElement(`.${element.classList[0]} .list__item_small`);
    item.classList.add("item_small_active");
  }
};

export default displayList;
