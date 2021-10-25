import { getElement } from "../assets";
import { display } from "./displayProd";

export const buttonLayoutListener = () => {
  const productsLayout = document.querySelectorAll(".products__layout");
  const ranges = document.querySelectorAll(".filters__input");
  const sortingButton = getElement(".products__sorting");

  productsLayout.forEach((button) => {
    button.addEventListener("click", (e) => {
      const companies = document.querySelectorAll(".company__button");
      const title = getElement(".breadcrumb__title");
      const subtitle = getElement(".breadcrumb__path span");
      let company = [];
      companies.forEach((item) =>
        item.classList.contains("company__button_active")
          ? company.push(item.innerHTML)
          : item
      );

      button.classList.add("products__layout_active");
      if (
        e.target.classList.contains("layout_list") ||
        e.target.parentElement.classList.contains("layout_list")
      ) {
        button.previousElementSibling.classList.remove(
          "products__layout_active"
        );
        title.textContent = "shop list sidebar";
        subtitle.textContent = "shop list sidebar";
      } else {
        button.nextElementSibling.classList.remove("products__layout_active");
        title.textContent = "shop grid sidebar";
        subtitle.textContent = "shop grid sidebar";
      }
      let price = [ranges[0].value, ranges[1].value];
      if (company.length == 1) {
        display(0, company[0], price, sortingButton, true);
      } else {
        display(0, "", price, sortingButton, true);
      }
    });
  });
};
