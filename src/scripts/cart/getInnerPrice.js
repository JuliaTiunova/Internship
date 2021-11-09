// get price from elements innerHTML
export const getInnerPrice = (price) => {
  price = price.split("$");
  return parseFloat(price[1]);
};
