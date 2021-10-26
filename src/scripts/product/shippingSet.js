import { getElement } from "../assets";

export const changeShippingText = () => {
  const shipping = getElement(".add__shipping span");
  const shipping2 = getElement(".info__tags span");
  const changeContent = (el) => {
    if (el.innerHTML == "0") {
      el.textContent = "Free";
    }
  };

  changeContent(shipping);
  changeContent(shipping2);
};
