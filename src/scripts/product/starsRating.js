export function getStarRating() {
  const ratingStars = [...document.querySelectorAll(".review__star")];

  function executeRating(stars) {
    const starClassActive = "review__star fas fa-star";
    const starClassInactive = "review__star far fa-star";
    const starsLength = stars.length;
    let i;
    stars.map((star) => {
      star.onmouseover = () => {
        i = stars.indexOf(star);

        if (star.className === starClassInactive) {
          for (i; i >= 0; i--) {
            stars[i].className = starClassActive;
          }
        } else {
          for (i; i < starsLength; i++) {
            stars[i].className = starClassInactive;
          }
        }
      };
    });
    stars.map((star) => {
      star.onclick = () => {
        const newStars = [...document.querySelectorAll(".review__star")];
        newStars.map((star) => {
          star.onmouseover = (e) => {
            e.preventDefault();
          };
        });
        i = stars.indexOf(star);
        if (star.className === starClassInactive) {
          for (i; i >= 0; i--) {
            stars[i].className = starClassActive;
          }
        } else {
          for (i; i < starsLength; i++) {
            stars[i].className = starClassInactive;
          }
        }
      };
    });
  }

  executeRating(ratingStars);
}
