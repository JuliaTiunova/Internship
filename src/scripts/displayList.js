import { getElement } from "./assets";
import button from "../templates/button.handlebars";
import list from "../templates/list.handlebars";

const displayList = (categories, element) => {
  if (element.className === "filters__categories") {
    element.innerHTML = button(categories);
    let items = document.querySelectorAll(".category__button");
    let layout = document.querySelectorAll(".products__layout");

    categories.data.forEach((element) => {
      if (element.subCategories.length === 0) {
        items.forEach((el) => {
          if (el.textContent === element.name + " " + "3") {
            el.classList.add("nospan");
          }
        });
      }
    });
    let url = window.location.href;
    let parts = url.split("=");
    let partsLayout = url.split("?");
    let layoutUrl = partsLayout[1];
    let id = parts[1];
    if (id) {
      items.forEach((item) => {
        if (item.dataset.id == id) {
          item.classList.add("category__button_active");
          layout[0].classList.add("products__layout_active");
        }
      });
    } else if (layoutUrl) {
      if (layoutUrl == "grid") {
        items[0].classList.add("category__button_active");
        layout[0].classList.add("products__layout_active");
      } else {
        items[0].classList.add("category__button_active");
        layout[1].classList.add("products__layout_active");
      }
    } else {
      items[0].classList.add("category__button_active");
      layout[0].classList.add("products__layout_active");
    }
  } else {
    element.innerHTML = list(categories);
    let item = getElement(`.${element.classList[0]} .list__item_small`);
    item.classList.add("item_small_active");
  }
};

export default displayList;
