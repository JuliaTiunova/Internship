import Handlebars from "handlebars/runtime";

export const setStock = () => {
  let random = Math.floor(Math.random() * 10).toFixed();
  while (random > 10) {
    random = Math.floor(Math.random() * 10).toFixed();
  }
  return random;
};

Handlebars.registerHelper("stockNumber", function(stock) {
  let text = "";
  if (stock == 0) {
    text = `Out of stock`;
  } else if (stock == 1) {
    text = `1 item left`;
  } else if (stock > 1 && stock <= 3) {
    text = `Few items left`;
  } else {
    text = `In stock`;
  }
  return text;
});

Handlebars.registerHelper("color", function(stock) {
  let color;
  if (stock == 0) {
    color = "#888888";
  } else if (stock == 1) {
    color = "#e32d2d";
  } else if (stock > 1 && stock <= 3) {
    color = "#e32d2d";
  } else {
    color = "#60a00c";
  }
  return color;
});

Handlebars.registerHelper("detailStock", function(stock) {
  let message = "";
  if (stock == 0) {
    message = `Out of stock`;
  } else if (stock == 1) {
    message = `Hurry up, there's only 1 left!`;
  } else if (stock > 1 && stock <= 3) {
    message = `Hurry up, there's only few left!`;
  } else {
    message = "";
  }
  return message;
});
