import { getElement } from "../assets";

export function deleteComma() {
  let line = getElement(".info__categories");
  let string = line.innerHTML;
  string = string.split("");
  string.splice(-2);
  string = string.join("");
  line.innerHTML = string;
}
