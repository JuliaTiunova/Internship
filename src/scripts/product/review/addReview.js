import { getElement } from "../../assets";
import * as $ from "jquery";

export function addReview(id, productName) {
  const form = getElement(".review__form");
  const name = getElement(".inputs__name");
  const mail = getElement(".inputs__email");
  const message = getElement(".inputs__message");
  const checkbox = getElement(".input__checkbox");
  const error = getElement(".error-message");
  const labels = document.querySelectorAll(".inputs label");

  $(error).hide();

  form.setAttribute("autocomplete", "off");

  function setError(element, e) {
    if (e) {
      e.preventDefault();
    }
    element.classList.add("error");
    element.focus();
    $(error).show(400);
  }

  function removeError(element) {
    element.classList.remove("error");
    $(error).hide(400);
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
      setError(name);
      error.textContent = `Please enter your name`;
    } else {
      removeError(name);
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

    let emailValue = mail.value.split("@");
    let beforeDot;
    if (emailValue[1]) {
      beforeDot = emailValue[1].split(".");
    }

    if (mail.value === "") {
      setError(mail);
      error.textContent = `Please enter an e-mail`;
    } else if (!emailValue[1] || !beforeDot[1] || beforeDot[1].length < 2) {
      setError(mail);
      error.textContent = `Please enter a valid e-mail`;
    } else {
      removeError(mail);
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
      setError(message);
    } else if (message.value.length < 10) {
      setError(message);
      error.textContent = `Please say more`;
    } else {
      removeError(message);
    }
  });

  form.addEventListener("submit", (e) => {
    if (name.value === "") {
      setError(name, e);
      error.textContent = `Please enter your name`;
    } else if (mail.value === "") {
      setError(mail, e);
      error.textContent = `Please enter an e-mail`;
    } else if (mail.classList.contains("error")) {
      setError(mail, e);
      error.textContent = `Please enter a valid e-mail`;
    } else if (message.value === "") {
      setError(message, e);
      error.textContent = `Please say something`;
    } else if (message.classList.contains("error")) {
      setError(message, e);
      error.textContent = `Please say more`;
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

      if (checkbox.checked) {
        let user = [
          {
            name: `${name.value}`,
            email: `${mail.value}`,
          },
        ];
        localStorage.setItem("user info", JSON.stringify(user));
      }
      window.open(`./product.html?id=${id}`, "_self");
    }
  });
}
