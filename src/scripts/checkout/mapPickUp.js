import { loader } from "./google";
import {
  coordinatesGuitarVault,
  coordinatesMonkeyMusic,
  coordinatesMusician,
} from "./shops";
import * as $ from "jquery";
import { getElement } from "../assets";
import shopDetails from "../../templates/shopDetails.handlebars";

// for focus on map
const mapSetOptions = {
  center: {
    lat: 50.50883352312825,
    lng: 30.50842402576799,
  },
  zoom: 10,
  gestureHandling: "greedy",
};

// show map with pickup options

export function initPickUp() {
  const shops = document.querySelectorAll(".shop__wrapper");
  const pickUpAddress = getElement(".pickupAddress__wrapper");
  const pickUpAddressInput = getElement("#pickupAddress");
  const vault = getElement(".vault");
  const monkey = getElement(".monkey");
  const musician = getElement(".musician");
  $(pickUpAddress).show(300);
  loader.load().then((google) => {
    let mapSet = new google.maps.Map(
      document.getElementById("mapSet"),
      mapSetOptions
    );

    requestShop(coordinatesGuitarVault, "guitar vault");
    requestShop(coordinatesMonkeyMusic, "monkey music");
    requestShop(coordinatesMusician, "musician");

    // get music shops, based on names and coordinates
    function requestShop(coords, name) {
      let request = {
        query: name,
        location: coords,
        radius: "200",
      };

      let service = new google.maps.places.PlacesService(mapSet);
      service.textSearch(request, callback);

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          // gather info and set markers
          // set id, so can gather info, when clicking on name or marker
          let info = results[0];
          let marker = new google.maps.Marker({
            position: info.geometry.location,
            map: mapSet,
            id: info.place_id,
            icon: "../../img/music_marker.png",
            title: info.name,
          });
          switch (name) {
            case "guitar vault":
              vault.dataset.id = info.place_id;
              break;
            case "monkey music":
              monkey.dataset.id = info.place_id;
              break;
            case "musician":
              musician.dataset.id = info.place_id;
          }
          marker.addListener("click", () => {
            shops.forEach((shop) => {
              if (marker.id === shop.dataset.id) {
                requestShopInfo(shop);
              }
            });
          });
        }
      }
    }

    shops.forEach((shop) => {
      shop.onclick = () => {
        requestShopInfo(shop);
      };
    });

    // display shop details
    function requestShopInfo(element) {
      let request = {
        placeId: element.dataset.id,
        fields: [
          "name",
          "rating",
          "formatted_phone_number",
          "formatted_address",
          "geometry",
          "opening_hours",
          "photo",
        ],
      };
      let service = new google.maps.places.PlacesService(mapSet);
      service.getDetails(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          mapSet.setCenter(results.geometry.location);
          mapSet.setZoom(12);
          let weekday_text = [...results.opening_hours.weekday_text];

          weekday_text.forEach((text) => {
            let newItem = {};
            newItem.days = text;
            weekday_text.push(newItem);
          });
          weekday_text.splice(0, 7);
          results.weekday_text = weekday_text;
          element.nextElementSibling.innerHTML = shopDetails(results);
          // fill in input with address so can be gathered later
          pickUpAddressInput.value = results.formatted_address;
        }
      });
      shops.forEach((shop) => {
        if (shop != element) {
          shop.classList.remove("active");
          $(shop.nextElementSibling).hide(300);
        }
      });
      element.classList.add("active");
      $(element.nextElementSibling).show(300);
    }
  });
}
