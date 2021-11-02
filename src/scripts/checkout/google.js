import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyAv16WqGNDpE3DNmnzBnrSOEx8hdpnGNzo",
  version: "weekly",
  libraries: ["places"],
});

const pyrmont = { lat: -33.866, lng: 151.196 };
const mapOptions = {
  center: pyrmont,
  zoom: 8,
};

loader
  .load()
  .then((google) => {
    new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        types: ["establishment"],
        componentRestrictions: { country: ["UA"] },
        fields: ["place_id", "geometry", "name"],
      }
    );
    new google.maps.Map(document.getElementById("map"), mapOptions);
  })
  .catch((e) => console.log(e));
