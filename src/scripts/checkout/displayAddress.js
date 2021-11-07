const address = document.querySelector(".address");
const city = document.querySelector(".city");
const postalCode = document.querySelector(".postal-code");
const country = document.querySelector(".country");
const novaPost = document.querySelector(".novaPost");
const apartment = document.querySelector(".apartment");
const region = document.querySelector(".region");

// displaying address after choosing option in autocomplete input

//for Nova Poshta
export const displayAddressNova = (obj) => {
  let descript = obj.Description.split(":");
  address.value = descript[1];
  novaPost.value = descript[0];
  city.value = obj.CityDescription;
  region.value = obj.SettlementAreaDescription;
};

//for courier
export const displayAddress = (place) => {
  address.value = "";
  place.forEach((item) => {
    item.types.forEach((type) => {
      switch (type) {
        case "street_number":
          address.value = `${item.long_name} `;
          break;
        case "locality":
          city.value = item.long_name;
          break;
        case "postal_code":
          postalCode.value = item.long_name;
          break;
        case "postal_code_suffix":
          postalCode.value += item.long_name;
          break;
        case "route":
          address.value += `${item.long_name}`;
          break;
        case "country":
          country.value = item.long_name;
      }
      apartment.focus();
    });
  });
};
