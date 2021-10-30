export const displayOutOfStock = (id) => {
  const messageWrapper = document.querySelectorAll(".products__message");
  let message = `There's not enough product`;
  messageWrapper.forEach((item) => {
    if (item.dataset.id == id) {
      item.innerHTML = message;
      item.classList.add("open");
      setTimeout(() => item.classList.remove("open"), 2500);
    }
  });
};
