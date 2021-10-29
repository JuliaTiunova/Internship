export function deleteComma(element) {
  if (element.length > 1) {
    element.forEach((item) => {
      let string = item.textContent;
      string = cutString(string);
      item.innerHTML = string;
    });
  } else if (element.length == 1) {
    let string = element[0].innerHTML;
    string = cutString(string);
    element[0].innerHTML = string;
  } else {
    let string = element.innerHTML;
    string = cutString(string);
    element.innerHTML = string;
  }
}

function cutString(string) {
  string = string.split("");
  string.splice(-2);
  string = string.join("");
  return string;
}
