export function setLastViewed(id) {
  if (localStorage.getItem("lastViewed")) {
    let list = JSON.parse(localStorage.getItem("lastViewed"));
    list.push(id);

    list = list.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

    while (list.length > 10) {
      list.shift(0);
    }
    localStorage.setItem("lastViewed", JSON.stringify(list));
  } else {
    let arr = [];
    arr.push(id);
    localStorage.setItem("lastViewed", JSON.stringify(arr));
  }
}
