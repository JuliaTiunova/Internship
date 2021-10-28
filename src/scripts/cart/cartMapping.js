export const amountMap = (cart, id, amount, newAmount, sign) => {
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      if (amount) {
        newAmount = cartItem.amount + amount;
      } else {
        if (sign) {
          newAmount = cartItem.amount - 1;
        } else {
          newAmount = cartItem.amount + 1;
        }
      }
      cartItem.amount = newAmount;
    }

    return cartItem;
  });
};

export const addValue = (id, product) => {
  const button = document.querySelectorAll(".cart__button");
  button.forEach((push) => {
    if (push.dataset.id * 1 === id) {
      let number = push.value * 1;
      push.value = number + product.amount;
    }
  });
};
