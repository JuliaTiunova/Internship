// display item amount in sidebar when added
export function setAmount(id, cart) {
  const amounts = document.querySelectorAll(".reserve__count_price");
  let product = cart.find((item) => item.id == id);
  amounts.forEach((item) => {
    if (item.dataset.id == id) {
      item.innerHTML = `${product.amount}x`;
    }
    return;
  });
}
