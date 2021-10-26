import { getElement } from "../assets";
import { getLayout, getNumber } from "./getLayout";

export const addPagination = (total, skip) => {
  let list = getLayout();
  let number = getNumber(list);

  let totalLeft = Math.floor(total / number);
  totalLeft = totalLeft * 1;
  const pages = getElement(".pagination");
  let count = [];
  if (total - number > 0) {
    for (let i = 0; i <= totalLeft; i++) {
      count.push(i + 1);
    }
    pages.innerHTML = count
      .map((item) => {
        return `<button class="products__page">${item}</button>`;
      })
      .join("");
    pages.innerHTML += `<button class="products__page products__page_next"><i class="fas fa-chevron-right"></i></button>`;
  } else {
    pages.innerHTML = `<button class="products__page">1</button>`;
  }

  const pagesButton = document.querySelectorAll(".products__page");
  if (skip > 0) {
    let newNumber = skip / number + 1;
    pagesButton.forEach((item) => {
      item.innerHTML == newNumber
        ? item.classList.add("products__page_active")
        : item;
    });
  } else {
    pagesButton.forEach((item) => {
      item.innerHTML == "1"
        ? item.classList.add("products__page_active")
        : item;
    });
  }

  if (total - number > 0) {
    const active = getElement(".products__page_active");
    const next = getElement(".products__page_next");

    if (active.nextSibling === next) {
      next.classList.add("products__page_inactive");
    }
  }
};
