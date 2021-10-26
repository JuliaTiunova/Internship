import { getElement } from "../assets";
import { display } from "./displayProd";
import { getLayout, getNumber } from "./getLayout";

export const buttonPageListener = () => {
  const pages = getElement(".pagination");
  const productWindow = getElement(".products");
  const sortingButton = getElement(".products__sorting");
  const ranges = document.querySelectorAll(".filters__input");
  let list = getLayout();
  let pagesNumber = getNumber(list);

  let skip = 0;

  pages.addEventListener("click", (e) => {
    list = getLayout();
    pagesNumber = getNumber(list);

    const element = e.target;
    let active = getElement(".products__page_active");

    const companies = document.querySelectorAll(".company__button");
    let company = [];
    companies.forEach((item) =>
      item.classList.contains("company__button_active")
        ? company.push(item.innerHTML)
        : item
    );

    if (
      element.classList.contains("products__page_next") ||
      element.classList.contains("fas")
    ) {
      if (
        active.nextElementSibling.classList.contains("products__page_next") ||
        active.nextElementSibling.classList.contains("fas")
      ) {
        skip = (active.innerHTML - 1) * pagesNumber;
      } else {
        skip = active.innerHTML * pagesNumber;
        active.classList.remove(".products__page_active");
        active.nextElementSibling.classList.add(".products__page_active");
      }
    } else {
      element.classList.add("products__page_active");
      if (element.innerHTML > 1) {
        skip = (element.innerHTML - 1) * pagesNumber;
      } else {
        skip = 0;
      }
    }
    productWindow.scrollIntoView();
    let price = [ranges[0].value, ranges[1].value];

    if (company.length == 1) {
      display(skip, company[0], price, sortingButton);
    } else {
      display(skip, "", price, sortingButton);
    }
  });
};
