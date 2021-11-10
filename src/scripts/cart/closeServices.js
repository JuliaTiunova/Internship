import { getElement, getStorageItem, setStorageItem } from "../assets";
import { displayTotals } from "./displayTotal";
import { getTotals } from "./getTotals";

// when services window is closed, depending on what was chosen
export const closeServices = (number, id) => {
  let servicesStorage = getStorageItem("services");
  const modal = getElement(".services__wrapper");
  const cart = getStorageItem("cart");
  const basketTotal = document.querySelectorAll(".basket__total");
  const basketServices = document.querySelectorAll(".basket__services");
  modal.classList.remove("open");

  function getServiceNumber(number) {
    const number2Mapping = {
      1: 30,
      2: 55,
      3: 70,
    };

    return number2Mapping[number] ?? 0;
  }

  // service amount
  let service = getServiceNumber(number);

  // assign service to a certain product id in the cart
  if (service > 0) {
    let setService = { name: service, hash: id, year: number };
    let item = servicesStorage.find((item) => item.hash == setService.hash);
    if (!item) {
      servicesStorage = [...servicesStorage, setService];
    } else {
      // remove previous service if there was for this product
      servicesStorage.map((item) => {
        if (item.hash == id && item.name == service) {
          return item;
        } else if (item.hash == id && item.name != service) {
          item.name = service;
          item.year = number;
          return item;
        }
      });
    }
    setStorageItem("services", servicesStorage);
  } else {
    // remove services for this product if pressed "no, thanks"
    servicesStorage = servicesStorage.filter((ent) => ent.hash != id);
    setStorageItem("services", servicesStorage);
  }

  // display new total for certain product
  basketTotal.forEach((product) => {
    if (product.dataset.id == id) {
      let item = cart.find((ent) => ent.id === id);
      if (number > 0) {
        product.innerHTML = `$${(item.amount * item.price + service).toFixed(
          2
        )}`;
      } else {
        product.innerHTML = `$${(item.amount * item.price).toFixed(2)}`;
      }
    }
  });

  // display chosen cervices for product
  basketServices.forEach((basket) => {
    if (basket.dataset.id == id) {
      if (number > 0) {
        basket.innerHTML = `${number} Year Plan`;
      } else {
        basket.innerHTML = `Add services`;
      }
    }
  });

  let totals = getTotals(cart);
  displayTotals(totals);
};
