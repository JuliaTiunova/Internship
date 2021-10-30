import { getElement } from "../assets";
import { closeServices } from "./closeServices";
// import { getInnerPrice } from "./getInnerPrice";

export const servicesListeners = () => {
  const services = document.querySelectorAll(".basket__services");

  if (services.length > 1) {
    services.forEach((service) => {
      service.addEventListener("click", () => {
        {
          let id = service.dataset.id * 1;
          openServices(id);
        }
      });
    });
  }
};

export const openServices = (id) => {
  const servicesClose = getElement(".services__close");
  const modal = getElement(".services__wrapper");
  const choices = document.querySelectorAll(".choice");
  const button = getElement(".services__button_add");
  const buttonNo = getElement(".services__button_no");

  let number = 2;
  modal.classList.add("open");

  servicesClose.onclick = () => {
    closeServices(id);
  };

  choices.forEach((choice) => {
    choice.onclick = (e) => {
      choices.forEach((item) => {
        item.classList.remove("choice_active");
      });
      e.target.classList.add("choice_active");
      number = e.target.dataset.id * 1;
    };
  });

  button.onclick = () => {
    closeServices(number, id);
  };
  buttonNo.onclick = () => {
    number = 0;
    closeServices(number, id);
  };
};
