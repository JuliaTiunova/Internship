import * as $ from "jquery";
import { getElement } from "../assets";
import { display } from "./displayProd";

export const buttonListenerProducts = (categoriesDOM) => {
  const buttonItem = document.querySelectorAll(".category__button");
  const sortingButton = getElement(".products__sorting");

  categoriesDOM.addEventListener("click", (e) => {
    const element = e.target;

    buttonItem.forEach((item) => {
      item.classList.contains("category__button_active")
        ? item.classList.remove("category__button_active")
        : item;
    });
    if (element.textContent == "3") {
      element.parentNode.classList.add("category__button_active");
      if (element.parentNode.nextElementSibling) {
        if (
          element.parentNode.nextElementSibling.classList.contains(
            "category__wrapper"
          )
        ) {
          $(element.parentNode)
            .next()
            .show(500);
          element.textContent = "2";
        }
      }
    } else if (element.textContent == "2") {
      element.parentNode.classList.add("category__button_active");
      if (element.parentNode.nextElementSibling) {
        if (
          element.parentNode.nextElementSibling.classList.contains(
            "category__wrapper"
          )
        ) {
          $(element.parentNode)
            .next()
            .hide(500);
          element.textContent = "3";
        }
      }
    } else {
      element.classList.add("category__button_active");
    }
    if (element.parentNode.nextElementSibling) {
      if (
        element.parentNode.nextElementSibling.classList.contains(
          "category__wrapper"
        )
      ) {
        $(element)
          .next()
          .toggle(500);
      }
    }

    display(0, "", "", sortingButton);
  });
};
