export function displayTotal(el, domEl) {
  const amount = el.reduce((total, item) => {
    return (total += item.price * item.amount);
  }, 0);
  domEl.innerHTML = ` $${amount.toFixed(2)}`;
}
