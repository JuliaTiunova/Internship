export function deleteComma(element) {
  if (element.length > 1) {
    element.forEach((item) => {
      let string = item.textContent;
      string = string.split("");
      string.splice(-2);
      string = string.join("");
      item.innerHTML = string;
    });
  } else if (element.length == 1) {
    let string = element[0].innerHTML;
    string = string.split("");
    string.splice(-2);
    string = string.join("");
    element[0].innerHTML = string;
  } else {
    let string = element.innerHTML;
    string = string.split("");
    string.splice(-2);
    string = string.join("");
    element.innerHTML = string;
  }
}
