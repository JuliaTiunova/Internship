import { getElement } from "../assets";

export function countListener() {
  const buttonWrapper = getElement(".quantity__button_wrapper");
  const counter = getElement(".quantity__count");
  let count = 1;

  buttonWrapper.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("quantity__more")) {
      count += 1;
    } else if (target.classList.contains("quantity__less")) {
      if (count == 1) {
        count = 1;
      } else {
        count -= 1;
      }
    }
    counter.innerHTML = count;
  });
}
