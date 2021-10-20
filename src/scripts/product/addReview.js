import { getElement } from "../assets";

export function addReview(id, productName) {
  const form = getElement(".review__form");
  const name = getElement(".inputs__name");
  const mail = getElement(".inputs__email");
  const message = getElement(".inputs__message");
  const labels = document.querySelectorAll(".inputs label");

  form.setAttribute("autocomplete", "off");

  function setError(element, e) {
    e.preventDefault();
    element.classList.add("error");
    element.focus();
  }

  name.addEventListener("input", () => {
    if (name.value !== "") {
      labels.forEach((label) => {
        if (label.attributes.for.value === "name") {
          label.style.display = "none";
        }
      });
    }

    if (name.value === "") {
      name.classList.add("error");
      name.focus();
    } else {
      name.classList.remove("error");
    }
  });

  mail.addEventListener("input", () => {
    if (mail.value !== "") {
      labels.forEach((label) => {
        if (label.attributes.for.value === "email") {
          label.style.display = "none";
        }
      });
    }

    if (mail.value === "") {
      mail.classList.add("error");
      mail.focus();
    } else {
      mail.classList.remove("error");
    }
  });

  message.addEventListener("input", () => {
    if (message.value !== "") {
      labels.forEach((label) => {
        if (label.attributes.for.value === "message") {
          label.style.display = "none";
        }
      });
    }

    if (message.value === "") {
      message.classList.add("error");
      message.focus();
    } else {
      message.classList.remove("error");
    }
  });

  form.addEventListener("submit", (e) => {
    if (name.value === "") {
      setError(name, e);
    } else if (mail.value === "") {
      setError(mail, e);
    } else if (message.value === "") {
      setError(message, e);
    } else {
      e.preventDefault();
      const stars = [...document.querySelectorAll(".review__star")];
      let number = 0;
      stars.forEach((item) => {
        if (item.classList.contains("fas")) {
          number += 1;
        }
      });
      let data = {};
      let formInfo = new FormData(form);
      for (let [name, value] of formInfo) {
        data[name] = value;
      }
      data.id = id;
      data.product = productName;
      data.rating = number;
      let info = [];
      info.push(data);
      if (localStorage.getItem("review")) {
        let reviews = JSON.parse(localStorage.getItem("review"));
        reviews.push(data);
        localStorage.setItem("review", JSON.stringify(reviews));
      } else {
        localStorage.setItem("review", JSON.stringify(info));
      }
      window.open(`./product.html?id=${id}`, "_self");
    }
  });
}
