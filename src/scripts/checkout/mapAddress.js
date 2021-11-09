import { displayAddress } from "./displayAddress";
import { loader, mapSetOptions } from "./google";

// leave logs for errors display

// display google map if courier option is chosen

export function initMapAddress() {
  loader
    .load()
    .then((google) => {
      let autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
          types: ["address"],
          componentRestrictions: { country: ["UA"] },
          fields: [
            "place_id",
            "geometry",
            "name",
            "adr_address",
            "address_components",
          ],
        }
      );
      let map;
      map = new google.maps.Map(document.getElementById("map"), mapSetOptions);

      autocomplete.addListener("place_changed", onPlaceChanged);

      //get info when place is chosen

      function onPlaceChanged() {
        let place = autocomplete.getPlace();

        if (!place.geometry) {
          document.getElementById("autocomplete").placeholder = "Enter a place";
        } else {
          displayAddress(place.address_components);
          map.setZoom(11);
          map.setCenter(place.geometry.location);
          let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
          });
          marker.addListener("click", () => {
            displayAddress(place.address_components);
          });
        }
      }
    })
    .catch((e) => console.log(e));
}
