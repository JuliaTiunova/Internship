// get price from elements innerHTML
export const getInnerPrice = (price) => {
  return (
    price
      .split("$")
      .join("")
      .split(" ")
      .join("") * 1
  );
};
