import { loader } from "./google";
import {
  coordinatesGuitarVault,
  coordinatesMonkeyMusic,
  coordinatesMusician,
} from "./shops";

const mapSetOptions = {
  center: {
    lat: 50.50883352312825,
    lng: 30.50842402576799,
  },
  zoom: 10,
  gestureHandling: "greedy",
};

export function initPickUp() {
  const shops = document.querySelectorAll(".shop__wrapper");
  loader.load().then((google) => {
    let mapSet = new google.maps.Map(
      document.getElementById("mapSet"),
      mapSetOptions
    );

    new google.maps.Marker({
      position: coordinatesGuitarVault,
      map: mapSet,
      icon: "../../img/music_marker.png",
      title: "Guitar Vault",
    });

    new google.maps.Marker({
      position: coordinatesMonkeyMusic,
      map: mapSet,
      icon: "../../img/music_marker.png",
      title: "Monkey Music",
    });

    new google.maps.Marker({
      position: coordinatesMusician,
      map: mapSet,
      icon: "../../img/music_marker.png",
      title: "Musician",
    });

    function setMap(parameters, shop) {
      mapSet.setCenter(parameters);
      mapSet.setZoom(16);
      shops.forEach((shop) => {
        shop.classList.remove("active");
      });
      shop.classList.add("active");
    }

    shops.forEach((shop) => {
      shop.onclick = () => {
        if (shop.classList.contains("vault")) {
          setMap(coordinatesGuitarVault, shop);
        } else if (shop.classList.contains("monkey")) {
          setMap(coordinatesMonkeyMusic, shop);
        } else if (shop.classList.contains("music")) {
          setMap(coordinatesMusician, shop);
        }
      };
    });
  });
}
