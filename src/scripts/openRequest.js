import { API_URL } from "./products/displayProd";

export function openRequest(element, link) {
  element.open("GET", link);
}

export function buildLink(number, skip, textId) {
  let url = new URLSearchParams();
  url.append("$limit", number);
  url.append("$skip", skip);
  url.append("category.id", textId);

  url = `${API_URL}?${url}`;
  return url;
}
