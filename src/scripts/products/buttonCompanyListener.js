import { getElement } from "../assets";
import { display } from "./displayProd";

export const buttonCompany = () => {
  const names = getElement(".filters__companies");
  const ranges = document.querySelectorAll(".filters__input");
  const sortingButton = getElement(".products__sorting");

  names.addEventListener("click", (e) => {
    const element = e.target;
    const buttonCompanies = document.querySelectorAll(".company__button");
    buttonCompanies.forEach((item) =>
      item.classList.contains("company__button_active")
        ? item.classList.remove("company__button_active")
        : item
    );
    let price = [ranges[0].value, ranges[1].value];
    element.classList.add("company__button_active");
    display(0, element.innerHTML, price, sortingButton, true);
  });
};
