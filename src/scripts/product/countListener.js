import { getElement } from "../assets";

export function countListener(element) {
  const buttonWrapper = getElement(`.${element}__button_wrapper`);
  const counter = getElement(`.${element}__count`);
  let count = 1;

  buttonWrapper.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains(`${element}__more`)) {
      count += 1;
    } else if (target.classList.contains(`${element}__less`)) {
      if (count == 1) {
        count = 1;
      } else {
        count -= 1;
      }
    }
    counter.innerHTML = count;
  });
}
