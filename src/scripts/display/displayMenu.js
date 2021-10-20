import { getElement } from "../assets";
import printMenu from "../../templates/menu.handlebars";
import printMenuFooter from "../../templates/menuFooter.handlebars";

export function displayMenu(arr) {
  const menu = getElement(".dropdown__content_main");
  const menuFooter = getElement(".table__content_dynamic");
  menuFooter.innerHTML = printMenuFooter(arr);
  menu.innerHTML = printMenu(arr);
}
