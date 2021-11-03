import { Loader } from "@googlemaps/js-api-loader";

export const loader = new Loader({
  apiKey: "AIzaSyAv16WqGNDpE3DNmnzBnrSOEx8hdpnGNzo",
  version: "weekly",
  libraries: ["places"],
});

export const mapSetOptions = {
  center: {
    lat: 50.50883352312825,
    lng: 30.50842402576799,
  },
  zoom: 10,
  gestureHandling: "greedy",
};
