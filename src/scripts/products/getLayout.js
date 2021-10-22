import { getElement } from "../assets";

export function getLayout() {
  const layout = getElement(".products__layout_active");

  if (layout.classList.contains("layout_grid")) {
    return false;
  } else if (layout.classList.contains("layout_list")) {
    return true;
  }
}

export function getNumber(layout) {
  if (layout) {
    return 5;
  } else {
    return 12;
  }
}
