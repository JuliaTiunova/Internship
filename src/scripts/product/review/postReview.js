import { getElement } from "../../assets";
import { displayIcons } from "./displayIcons";
import { setReviewPic } from "./setReviewPic";
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
    const article = (message, name, rating) => {
      let icons = "";

      if (rating == 0) {
        icons = ``;
      } else {
        for (let i = 0; i < rating; i++) {
          icons += `<i class="fas fa-star"></i>`;
        }
        for (let i = rating; i < 5; i++) {
          icons += `<i class="far fa-star"></i>`;
        }
      }

      return `<div class="review__card">
        <blockquote class="review__text">“${message}</blockquote>
        <div class="review__author author">
            <div class="author__wrapper">
                <div class="author__img">
                <img src="${setReviewPic()}" alt="profile pic" />
                </div>
                <p class="author__name">${name}</p>
            </div>
            <div class="author__ratings">${icons}
            </div>
        </div>
    </div>`;
    };

    review.innerHTML = newSet
      .map((item) => {
        const { name, message, rating } = item;
        return article(message, name, rating);
      })
      .join("");
  } else {
    const starRatingCount = getElement(".info__name_ratings");
    let icons = "";
    for (let i = 0; i < 5; i++) {
      icons += `<i class="rating__star far fa-star"></i>`;
    }
    icons += `<span> No reviews yet</span>`;
    starRatingCount.innerHTML = icons;
  }

  getStarRating();
}
