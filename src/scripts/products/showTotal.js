import { getElement } from "../assets";
import { getLayout, getNumber } from "./getLayout";

export const showTotal = (total, skip) => {
  let list = getLayout();
  let number = getNumber(list);

  let show = getElement(".products__result");
  if (skip + number < total) {
    show.innerHTML = `Showing ${skip + 1} - ${skip + number} of ${total}`;
  } else if (skip + 1 == total) {
    show.innerHTML = `Showing ${total} of ${total}`;
  } else if (total > number) {
    show.innerHTML = `Showing ${skip + 1} - ${total} of ${total}`;
  } else if (skip < 1 && total < 1) {
    show.innerHTML = `Showing ${total}`;
  } else {
    show.innerHTML = `Showing ${skip + 1} - ${total} of ${total}`;
  }
};
