import * as $ from "jquery";
import { getElement } from "../assets";

export function descriptListener() {
  const buttonsWrapper = getElement(".descript__button_wrapper ");
  const buttons = document.querySelectorAll(".descript__button");
  const content = document.querySelectorAll(".descript__change");
  content.forEach((item) => {
    if (!item.classList.contains("descript_visible")) {
      $(item).fadeOut(100);
    }
  });

  buttonsWrapper.addEventListener("click", (e) => {
    let target = e.target;

    buttons.forEach((item) => {
      item.classList.remove("descript__button_active");
    });

    if (target.value == "addition") {
      content.forEach((item) => {
        if (item.classList.contains("descript__add")) {
          $(item).show(500);
        } else {
          $(item).hide(400);
        }
      });
      target.classList.add("descript__button_active");
    } else if (target.value == "review") {
      content.forEach((item) => {
        if (item.classList.contains("descript__review")) {
          $(item).show(500);
        } else {
          $(item).hide(400);
        }
      });
      target.classList.add("descript__button_active");
    } else if (target.value == "description") {
      content.forEach((item) => {
        if (item.classList.contains("descript__text")) {
          $(item).show(500);
        } else {
          $(item).hide(400);
        }
      });
      target.classList.add("descript__button_active");
    }
  });
}
