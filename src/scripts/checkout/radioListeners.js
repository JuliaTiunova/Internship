import { initMapAddress } from "./mapAddress";
import { initMapNova } from "./mapNova";
import { initPickUp } from "./mapPickUp";
import { getElement } from "../assets";
import * as $ from "jquery";

const radioButtons = document.querySelectorAll(".delivery__radio");
const deliveryWindow = document.querySelectorAll(".delivery__options");
const shipping = getElement(".shipping");
const nova = getElement(".novaPost");
const apartment = getElement(".apartment");

hide();
$(shipping).hide();

function hide() {
  deliveryWindow.forEach((item) => {
    $(item).hide(300);
  });
}

function hideAndShow(button) {
  hide();
  $(button.parentElement.nextElementSibling).slideDown(300);
}

radioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button);
    if (button.id == "pickUp") {
      hideAndShow(button);
      $(shipping).hide(300);
      initPickUp();
    } else if (button.id == "novaPost") {
      hideAndShow(button);
      $(shipping).show(300);
      $(nova).show(200);
      $(apartment).hide(200);
      initMapNova();
    } else if (button.id == "courier") {
      hideAndShow(button);
      $(shipping).show(300);
      $(apartment).show(200);
      $(nova).hide(200);
      initMapAddress();
    }
  });
});
