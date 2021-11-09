import { loader, mapSetOptions } from "./google";
import * as $ from "jquery";
import optionsRender from "../../templates/options.handlebars";
import optionsWarehouseRender from "../../templates/optionsWarehouse.handlebars";
import { getElement } from "../assets";
import { displayAddressNova } from "./displayAddress";
import { fixPosition, formSettings } from "./mapNovaFunc";

const selectWrapper = getElement(".list__cities");
const select = getElement("#cities");
const warehouse = document.querySelector("#warehouse");
const input = getElement(".search__filter");
const postMessage = getElement(".novaPost__message");
const API_NOVA = "16a99a981883e32fe079045f4e009382";

let data;

// get cities from nova poshta api
$(function() {
  data = `{\r\n"apiKey": "${API_NOVA}",\r\n "modelName": "AddressGeneral",\r\n "calledMethod": "getCities"\r\n}`;
  let settings = formSettings(data);

  $.ajax(settings).done(function(response) {
    select.innerHTML = optionsRender(response);

    // filter cities list
    let optionsCache = [];

    for (let i = 0, iLength = select.options.length; i < iLength; i++) {
      optionsCache.push(select.options[i]);
    }

    function filterItems(el) {
      let value = el.value.toLowerCase();
      let opt;

      if (value == "") {
        restoreOptions();
      } else {
        for (let i = select.options.length - 1; i >= 0; i--) {
          opt = select.options[i];
          if (opt.text.toLowerCase().indexOf(value) == -1) {
            select.removeChild(opt);
          }
        }
      }
    }

    function restoreOptions() {
      select.options.length = 0;
      for (let i = 0, iLength = optionsCache.length; i < iLength; i++) {
        select.appendChild(optionsCache[i]);
      }
    }
    input.onfocus = () => {
      $(select).show(300);
    };
    input.onkeyup = () => {
      filterItems(input);
    };
  });
});

function showErrorMessage() {
  $(postMessage)
    .show(300)
    .delay(900)
    .hide(300);
}

// display map if city is chosen from the list
select.onchange = () => {
  initMapNova();
  input.value = select.value;
};

// display map
export function initMapNova() {
  loader.load().then((google) => {
    let mapNova;

    mapNova = new google.maps.Map(
      document.getElementById("mapNova"),
      mapSetOptions
    );

    // get warehouses list depending on chosen city
    $(function() {
      let city = select.value;
      data = `{\r\n"apiKey": "${API_NOVA}",\r\n "modelName": "AddressGeneral",\r\n "calledMethod": "getWarehouses",\r\n "methodProperties": {\r\n "CityName": "${city}"\r\n }\r\n}`;
      let settings = formSettings(data);

      $.ajax(settings).done(function(response) {
        if (response.data.length > 0) {
          $(selectWrapper.nextElementSibling).slideDown(300);
          $(select).hide(300);
          warehouse.innerHTML = optionsWarehouseRender(response);
          warehouse.onchange = () => {
            // get warehouse info to display on map and fill in inputs in shipping section
            $(function() {
              data = `{\r\n"apiKey": "${API_NOVA}",\r\n "modelName": "Address",\r\n "calledMethod": "getWarehouses",\r\n "methodProperties": {\r\n "Ref": "${warehouse.value}"\r\n }\r\n}`;
              let settings = formSettings(data);

              $.ajax(settings).done(function(response) {
                if (response.data.length > 0) {
                  // fill in inputs
                  displayAddressNova(response.data[0]);

                  // add marker for warehouse
                  let pos = {
                    lat: response.data[0].Latitude * 1,
                    lng: response.data[0].Longitude * 1,
                  };
                  let marker = new google.maps.Marker({
                    position: pos,
                    map: mapNova,
                    id: response.data[0].Ref,
                    optimized: false,
                  });
                  // fill in / change inputs if marker is clicked
                  // can be multiple markers on map if different warehouses were chosen
                  marker.addListener("click", () => {
                    $(function() {
                      data = `{\r\n"apiKey": "${API_NOVA}",\r\n "modelName": "Address",\r\n "calledMethod": "getWarehouses",\r\n "methodProperties": {\r\n "Ref": "${marker.id}"\r\n }\r\n}`;
                      let settings = formSettings(data);

                      $.ajax(settings).done(function(response) {
                        displayAddressNova(response.data[0]);
                        fixPosition(response, mapNova, 13);
                      });
                    });
                  });

                  fixPosition(response, mapNova, 13);
                } else {
                  // error message, if there are no warehouses in the city
                  showErrorMessage();
                }
              });
            });
          };
          fixPosition(response, mapNova, 12);
        } else {
          showErrorMessage();
        }
      });
    });
  });
}
