/**
 * Создание картинки для карты
 * @param {object} markerOptions
 * @returns {*}
 */
function createMapIcon(markerOptions) {
  return this.map.lib.icon({
    iconUrl: markerOptions.options.icon.iconUrl,
    iconSize: markerOptions.options.icon.iconSize,
    iconAnchor: markerOptions.options.icon.iconAnchor,
  });
}

/**
 * Создание маркера
 * @param {object} markerOptions
 * @param {object} markerIcon
 * @returns {*}
 */
function createMapMarker(markerOptions, markerIcon) {
  return this.map.lib.marker(
    markerOptions.coordinate,
    {
      icon: markerIcon,
      draggable: markerOptions.options.draggable,
    },
  );
}

/**
 * Добавление маркера
 * @param markerOptions
 */
function addMarker(markerOptions) {
  const markerIcon = this.createMapIcon(markerOptions);
  const marker = this.createMapMarker(markerOptions, markerIcon);
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
 * Установка координат для маркера
 * @param {object} marker
 * @param {object} options
 */
function setMarkerCoordinate(marker, options) {
  marker.setLatLng(options);
}

/**
 * Добавление несколько маркеров
 * @param markerOptions
 * @returns {*}
 */
function addMarkers(markerOptions) {
  const markerGroup = this.map.lib.layerGroup().addTo(this.map.element);
  for(const item of markerOptions ) {
    const marker = this.addMarker(item);
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
 * Задать координаты поля из маркера
 * @param input
 * @param marker
 * @param point
 */
function setInputFromMarkerCoordinate(input, marker, point) {
  point = Math.pow(10, point);
  const format = (lat, lng) => `${Math.round(lat*point)/point}, ${Math.round(lng*point)/point}`;
  const element = document.querySelector(input);
  element.value = format(marker.getLatLng().lat, marker.getLatLng().lng);
  marker.on('moveend', (evt) => {
    element.value = format(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
  });
}

const renderMap = {
  map: {
    'lib': '',
    'element': '',
    'filteredAdGroup': '',
  },
  createMapIcon,
  createMapMarker,
  init,
  addMarker,
  addMarkers,
  setInputFromMarkerCoordinate,
  setMarkerCoordinate,
};

export {renderMap};
