import * as $ from "jquery";

// when adding product directly in the cart, show message, when there's not enough in stock
export const setMessage = (element) => {
  let wrapper = document.createElement("div");
  let p = document.createElement("p");
  let window = element.parentElement;
  if (window.classList.contains("quantity")) {
    window.after(wrapper);
  } else {
    window.appendChild(wrapper);
  }
  wrapper.appendChild(p);
  wrapper.classList.add("basket__window_stock");
  p.classList.add("basket__window_message");
  p.innerHTML = `Sorry, that's all we have`;
  $(wrapper).hide();
};

export const openMessage = (id) => {
  const wrapper = document.querySelectorAll(".basket__window_stock");
  if (wrapper.length > 1) {
    wrapper.forEach((wrap) => {
      if (wrap.parentElement.dataset.id * 1 === id) {
        $(wrap)
          .slideDown(300)
          .delay(1000)
          .slideUp(300);
      }
    });
  } else {
    $(wrapper)
      .slideDown(300)
      .delay(1000)
      .slideUp(300);
  }
};
