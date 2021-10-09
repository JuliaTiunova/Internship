const displayList = (categories, element) => {
  element.innerHTML = `<li class="list__item_small item_small">All</li>`;
  element.innerHTML += categories
    .map((category) => {
      const { name } = category;
      return `<li class="list__item_small item_small">${name}</li>`;
    })
    .join("");
};

export default displayList;
