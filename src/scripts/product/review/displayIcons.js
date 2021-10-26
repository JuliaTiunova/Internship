import { getElement } from "../../assets";
import { countRatings } from "./countRatings";

export function displayIcons(newSet) {
  const starRatingCount = getElement(".info__name_ratings");
  let ratingNumber = countRatings(newSet);
  let icons = "";

  if (newSet.length == 0) {
    for (let i = 0; i < 5; i++) {
      icons += `<i class="rating__star far fa-star"></i>`;
    }
    icons += `<span> No reviews yet</span>`;
  } else {
    for (let i = 0; i < Math.floor(ratingNumber); i++) {
      icons += `<i class="rating__star fas fa-star"></i>`;
    }

    if (ratingNumber % 1 !== 0) {
      icons += `<i class="rating__star fas fa-star-half-alt"></i>`;
    }
    for (let i = Math.ceil(ratingNumber); i < 5; i++) {
      icons += `<i class="rating__star far fa-star"></i>`;
    }
    if (newSet.length == 1) {
      icons += ` <span>(${newSet.length} customer review)</span>`;
    } else if (newSet.length > 1) {
      icons += ` <span>(${newSet.length} customer reviews)</span>`;
    } else {
      icons += ` <span>(No reviews yet)</span>`;
    }
  }

  starRatingCount.innerHTML = icons;
}
