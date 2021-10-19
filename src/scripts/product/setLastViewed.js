export function setLastViewed(id) {
  if (localStorage.getItem("lastViewed")) {
    let list = [];
    let item = localStorage.getItem("lastViewed");
    list.push(item);
    list.push(id);
    if (list.length == 2) {
      let part = list[0].split(",");
      if (part.length == 1) {
        list = [list, part];
      } else {
        list = [...part, id];
      }
    }

    list = list.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

    while (list.length > 10) {
      list.shift(0);
    }

    localStorage.setItem("lastViewed", list);
  } else {
    localStorage.setItem("lastViewed", id);
  }
}
