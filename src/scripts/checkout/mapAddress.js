import { loader, mapSetOptions } from "./google";

if (navigator) {
  navigator.geolocation.getCurrentPosition(success, error);
}

let latitude;
let longitude;
let mapOptions;

function success(pos) {
  let coords = pos.coords;

  latitude = coords.latitude;
  longitude = coords.longitude;
  mapOptions = {
    center: {
      lat: latitude * 1,
      lng: longitude * 1,
    },
    zoom: 11,
    gestureHandling: "greedy",
  };
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

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
      if (navigator) {
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        new google.maps.Marker({
          position: mapOptions.center,
          map: map,
        });
      } else {
        map = new google.maps.Map(
          document.getElementById("map"),
          mapSetOptions
        );
      }

      autocomplete.addListener("place_changed", onPlaceChanged);

      function onPlaceChanged() {
        let place = autocomplete.getPlace();
        console.log(place);

        if (!place.geometry) {
          document.getElementById("autocomplete").placeholder = "Enter a place";
        } else {
          let address = document.querySelector(".address");
          place.address_components.forEach((item) => {
            item.types.forEach((type) => {
              switch (type) {
                case "street_number":
                  address.value = `${item.long_name} `;
                  break;
                case "locality":
                  document.querySelector(".city").value = item.long_name;
                  break;
                case "postal_code":
                  document.querySelector(".postal-code").value = item.long_name;
                  break;
                case "postal_code_suffix":
                  document.querySelector(".postal-code").value = item.long_name;
                  break;
                case "route":
                  address.value += `${item.long_name}`;
                  break;
                case "country":
                  document.querySelector(".country").value = item.long_name;
              }
              document.querySelector(".apartment").focus();
            });
          });
          mapSetOptions.center.lng = place.geometry.viewport.Pa.g;
          mapSetOptions.center.lat = place.geometry.viewport.yb.g;
          map.setZoom(11);
          map.setCenter(mapSetOptions.center);
          new google.maps.Marker({
            position: mapSetOptions.center,
            map: map,
          });
        }
      }
    })
    .catch((e) => console.log(e));
}
