import { display } from "./displayProd";

export const buttonSearchListener = (button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const companies = document.querySelectorAll(".company__button");
    let company = [];
    companies.forEach((item) =>
      item.classList.contains("company__button_active")
        ? company.push(item.innerHTML)
        : item
    );
    if (company.length == 1) {
      display(0, company[0], false, false, true);
    } else {
      display(0, false, false, false, true);
    }
  });
};
