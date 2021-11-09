// functions for mapNova

export function fixPosition(response, map, zoom) {
  let positionNew = {
    lat: response.data[0].Latitude * 1,
    lng: response.data[0].Longitude * 1,
  };
  map.setCenter(positionNew);
  map.setZoom(zoom);
}

export function formSettings(data) {
  let settings = {
    async: true,
    crossDomain: true,
    url: "https://api.novaposhta.ua/v2.0/json/",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    processData: false,
    data: data,
  };
  return settings;
}
