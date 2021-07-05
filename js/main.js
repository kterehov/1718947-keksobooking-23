import {showFailMessage, addModal} from './informative-message.js';
import {formatAds} from './utils.js';
import {request} from './request.js';
import {createCard} from './card.js';
import {disableForm, enableForm} from './form-activity.js';
import {submitFormEvent, resetDefaultValuesForm} from './form-event.js';
import {filterData} from './form-filter.js';
import {RenderMap} from './map.js';

/**
 * Дефолтный координаты
 * @type {object}
 */
const DEFAULT_COORS = {
  lat: 35.682418,
  lng: 139.753146,
  zoom: 12,
};

const backendUrls = {
  loadAds: 'https://23.javascript.pages.academy/keksobooking/data',
  saveAds: 'https://23.javascript.pages.academy/keksobooking',
};

/**
 * Конфиг для рендера карты
 * @type {object}
 */
const mapOptions = {
  init: {
    sourceImg: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    copyright: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    event: {
      load: enableForm,
    },
    coordinate: DEFAULT_COORS,
  },
};

/**
 * Конфиг главного маркера
 * @type {object}
 */
const mainMarkerOptions = {
  coordinate: DEFAULT_COORS,
  options: {
    draggable: true,
    icon: {
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    },
  },
};

/**
 * Основной маркер
 * @type {object}
 */
const markerOptions = {
  draggable: false,
  icon: {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
  createCard,
};

/**
 * Обновление объявлений на карте
 * @param {L} map
 * @param {object} items
 */
const updateAdsInMap = (map, items) => {
  if(map.map.filteredAdGroup){
    map.map.filteredAdGroup.remove();
  }
  const configAds = formatAds(items, markerOptions);
  map.map.filteredAdGroup = map.addMarkers(configAds);
};

/**
 * Добавление объявлений с сервера
 * @param map
 */
const addAdsFromServer = (map) => {
  request(
    backendUrls.loadAds,
    (body) => {
      /**
       * Фильтрация по фильтрам формы
       */
      filterData(body, (items) => updateAdsInMap(map, items));
    },
    showFailMessage,
  );
};

/**
 * Установить адрес
 * @param {L} map
 * @param {object} mainMarker
 */
const setAddress = (map, mainMarker) => {
  map.setInputFromMarkerCoordinate('#address', mainMarker, 5);
};

/**
 * Создание карты
 * @returns {{map, mainMarker}}
 */
const createMapMarker = () => {
  const map = RenderMap;
  map.init(L, mapOptions);
  const mainMarker = map.addMarker(mainMarkerOptions);
  setAddress(map, mainMarker);
  return {map, mainMarker};
};

/**
 * Создание карты
 */
const init = () => {
  /**
   * Отключаем формы до рендера
   */
  disableForm();

  /**
   * Рисуем карту
   */
  const {map, mainMarker} = createMapMarker();

  /**
   * Добавляем данные с сервера
   */
  addAdsFromServer(map);

  /**
   * Вешаем эвенты на форму
   */
  submitFormEvent(
    (body)=>request(
      backendUrls.saveAds,
      () => {
        addModal('#success');
        resetDefaultValuesForm();
        map.setMarkerCoordinate(mainMarker, DEFAULT_COORS);
        setAddress(map, mainMarker);
      },
      () =>  addModal('#error'),
      {
        method: 'POST',
        body,
      }),
    showFailMessage,
  );
};

init();
