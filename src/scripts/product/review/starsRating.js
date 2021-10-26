export function getStarRating() {
  const ratingStars = [...document.querySelectorAll(".review__star")];

  function executeRating(stars) {
    const starClassActive = "review__star fas fa-star";
    const starClassInactive = "review__star far fa-star";
    const starsLength = stars.length;
    let i;

    function setClass(arr, el) {
      if (el.className === starClassInactive) {
        for (i; i >= 0; i--) {
          arr[i].className = starClassActive;
        }
      } else {
        for (i; i < starsLength; i++) {
          arr[i].className = starClassInactive;
        }
      }
    }
    stars.map((star) => {
      star.onmouseover = () => {
        i = stars.indexOf(star);

        setClass(stars, star);
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
        setClass(stars, star);
      };
    });
  }

  executeRating(ratingStars);
}
