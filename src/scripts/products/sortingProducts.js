import { getElement } from "../assets";
import { display } from "./displayProd";

export function sortButtonListener() {
  const buttonDefault = getElement(".products__sorting");
  const sorting = document.querySelectorAll(".products__sorting-option");
  const ranges = document.querySelectorAll(".filters__input");

  sorting.forEach((button) => {
    button.addEventListener("click", () => {
      let initialText = buttonDefault.textContent;
      let initialValue = buttonDefault.value;
      buttonDefault.innerHTML = `${button.innerHTML} <i class="fas fa-chevron-down"></i>`;
      buttonDefault.value = button.value;
      button.innerHTML = initialText;
      button.value = initialValue;
      let companies = document.querySelectorAll(".company__button");
      let company = "";
      companies.forEach((item) =>
        item.classList.contains("company__button_active")
          ? (company = item.innerHTML)
          : ""
      );
      let price = [ranges[0].value, ranges[1].value];
      if (company) {
        display(0, company, price, buttonDefault);
      } else {
        display(0, false, price, buttonDefault);
      }
    });
  });
}
