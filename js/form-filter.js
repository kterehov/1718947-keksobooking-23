import {storageMapFilterForm} from './form-variables.js';

/**
 * Количество элементов на карте
 * @type {number}
 */
const COUNT_ON_MAP = 10;

/**
 * Количество элементов на карте
 * @type {number}
 */
const TIME_REFRESH = 500;

/**
 * Функция фильтрации цен
 * @type {object}
 */
const priceFilter = {
  middle: (value) => (value>=10000 && value<=50000),
  low: (value) => (value<=10000),
  high: (value) => (value>=50000),
};

/**
 * Строгое сравнение значений в фильтраци
 * @param {object} data
 * @param {string} key
 * @param {string|int} currentValue
 */
const strictComparison = (data, key, currentValue) => data.filter((item) => (item.offer[key].toString() === currentValue.toString()));

/**
 * Сравнение цены
 * @param {object} data
 * @param {string} key
 * @param {string|int} currentValue
 */
const comparePrices = (data, key, currentValue) => data.filter((item) => priceFilter[currentValue](item.offer[key]));

/**
 * Сравнение удобств
 * @param {object} data
 * @param {string} key
 * @param {string|int} currentValue
 */
const compareFeatures = (data, key, currentValue) => (data.filter((item) => {
  if (item.offer[key] === undefined) {
    return false;
  }
  for (const feature of currentValue) {
    if (!item.offer[key].includes(feature)) {
      return false;
    }
  }
  return true;
})
);

/**
 * Правила фильтрации
 * @type {object}
 */
const filterRule = {
  'result': {},
  'housing-type': (data, key, currentValue) => strictComparison(data, key, currentValue[0]),
  'housing-rooms': (data, key, currentValue) => strictComparison(data, key, currentValue[0]),
  'housing-guests': (data, key, currentValue) => strictComparison(data, key, currentValue[0]),
  'housing-price': (data, key, currentValue) => comparePrices(data, key, currentValue[0]),
  'features': (data, key, currentValue) => compareFeatures(data, key, currentValue),
  'debounceTimer': '',
};

const getKeyFilter = (value) => value.replace('housing-', '');

/**
 * Эвент фильтрации
 * @param {object} evt
 * @param {object} data
 * @param {function} updateAdsInMap
 */
const filterEvent = (form, data, updateAdsInMap) => {
  /**
   * Закидываем все объекты
   */
  filterRule.result = data.slice();
  const currentValues = new FormData(form);

  for (const key of currentValues.keys()) {

    /**
     * Получаем все элементы фильтра из формы
     * @type {FormDataEntryValue[]}
     */
    const currentValue = currentValues.getAll(key);

    /**
     * Если выбран фильтр и есть правило на фильт
     */
    if(currentValue[0]!=='any' && filterRule[key]){

      /**
       * Оставляем только прошедшие фильтрацию объявления
       */
      filterRule.result = filterRule[key](filterRule.result, getKeyFilter(key), currentValue);
    }
  }

  /**
   * Отрисовываем карту при изменение формы
   */
  updateAdsInMap(filterRule.result.slice(0,COUNT_ON_MAP));
};

const filterData = (data, updateAdsInMap) => {
  storageMapFilterForm.el.mapFilterForm.addEventListener('change', () => {
    clearTimeout(filterRule.debounceTimer);
    filterRule.debounceTimer = setTimeout(() => filterEvent(storageMapFilterForm.el.mapFilterForm, data, updateAdsInMap), TIME_REFRESH);
  });

  /**
   * Отрисовываем карту при инициализации
   */
  updateAdsInMap(data.slice(0,COUNT_ON_MAP));
};

export {filterData};
