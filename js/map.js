/**
 * Добавление маркера
 * @param markerOptions
 */
function addMarker(markerOptions) {
  const markerIcon = this.map.lib.icon({
    iconUrl: markerOptions.options.icon.iconUrl,
    iconSize: markerOptions.options.icon.iconSize,
    iconAnchor: markerOptions.options.icon.iconAnchor,
  });
  const marker = this.map.lib.marker(
    markerOptions.coordinate,
    {
      icon: markerIcon,
      draggable: markerOptions.options.draggable,
    },
  );
  const result = marker.addTo(this.map.element);
  if (markerOptions.content) {
    result.bindPopup(
      markerOptions.content, {
        keepInView: true,
      });
  }
  return result;
}

/**
 * Добавление несколько маркеров
 * @param markerOptions
 * @returns {*}
 */
function addMarkers(markerOptions) {
  const markerGroup = this.map.lib.layerGroup().addTo(this.map.element);
  for(const item in markerOptions ) {
    const marker = this.addMarker(markerOptions[item]);
    marker.addTo(markerGroup);
  }
  return markerGroup;
}

/**
 * Инициализация карты
 * @param mapLibrary
 * @param options
 */
function init(mapLibrary, options) {
  this.map.lib = mapLibrary;
  this.map.element = mapLibrary.map('map-canvas')
    .on('load', options.init.event.load)
    .setView({
      lat: options.init.coordinate.lat,
      lng: options.init.coordinate.lng,
    }, options.init.coordinate.zoom);

  L.tileLayer(
    options.init.sourceImg,
    {
      attribution: options.init.copyright,
    },
  ).addTo(this.map.element);
}

/**
 * Задать координаты поля из макрера
 * @param input
 * @param marker
 */
function setInputFromMarkerCoordinate(input, marker) {
  const setElemenet = (currenElement, value) => {
    const regex = /[\d, ., \\,]{1,30}/;
    currenElement.value = regex[Symbol.match](value);
  };
  const element = document.querySelector(input);
  setElemenet(element, marker.getLatLng());
  marker.on('moveend', (evt) => {
    setElemenet(element, evt.target.getLatLng());
  });
}

const renderMap = {
  map: {
    'lib': '',
    'element': '',
  },
  init,
  addMarker,
  addMarkers,
  setInputFromMarkerCoordinate,
};

export {renderMap};
