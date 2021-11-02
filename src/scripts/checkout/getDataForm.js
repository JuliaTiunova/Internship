export function getData(form) {
  let data = {};
  let formInfo = new FormData(form);

  for (let [name, value] of formInfo) {
    data[name] = value;
  }

  //   let json = JSON.stringify(data);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.send(data);
  xhr.onload = () => console.log(data);
}
