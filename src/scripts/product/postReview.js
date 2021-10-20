import { getElement } from "../assets";
import { displayIcons } from "./displayIcons";
import { getStarRating } from "./starsRating";

export function postReview() {
  if (localStorage.getItem("review")) {
    const counter = getElement(".descript__button span");
    const review = getElement(".review__customer");
    let set = JSON.parse(localStorage.getItem("review"));

    let url = window.location.href;
    url = url.split("=");
    let id = url[1];

    let newSet = set.filter((item) => {
      return item.id == id;
    });
    counter.innerHTML = `(${newSet.length})`;

    displayIcons(newSet);

    review.innerHTML = newSet
      .map((item) => {
        const { name, message, rating } = item;
        let icons = "";
        for (let i = 0; i < rating; i++) {
          icons += `<i class="fas fa-star"></i>`;
        }
        for (let i = rating; i < 5; i++) {
          icons += `<i class="far fa-star"></i>`;
        }

        return ` 
        <div class="review__card">
            <blockquote class="review__text">“${message}</blockquote>
            <div class="review__author author">
                <div class="author__wrapper">
                    <div class="author__img">
                    </div>
                    <p class="author__name">${name}</p>
                </div>
                <div class="author__ratings">${icons}
                </div>
            </div>
        </div>`;
      })
      .join("");
  }

  getStarRating();
}
