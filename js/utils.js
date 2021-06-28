/**
 * Функция валидации
 *
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
function validateRandomNumber(min, max) {
  return (min < 0 || (max > min));
}

/**
 * Возвращает случайное целое число из переданного диапазона включительно
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomIntInclusive(min, max) {
  if (validateRandomNumber(min, max) === false) {
    return 0;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Возвращает случайное число с плавающей точкой из переданного диапазона включительно.
 *
 * @param {number} min
 * @param {number} max
 * @param {number} point
 * @returns {number}
 */
function getRandomFloatInclusive(min, max, point) {
  point = Math.pow(10, point);
  return getRandomIntInclusive(min * point, max * point) / point;
}

/**
 * Случайный элемент из массива
 *
 * @param {array} items
 * @returns {string}
 */
const getRandomItem = (items) => (items[getRandomIntInclusive(0, items.length - 1)]);

/**
 * Рандомный уникальный массив из массива
 *
 * @param {array} items
 * @returns {array}
 */
const getRandomArray = (items) => {
  const result = [];
  while (result.length === 0) {
    for (let iterable = 0; iterable < items.length - 1; iterable++) {
      if (Math.random() <= 0.5) {
        result.push(items[iterable]);
      }
    }
  }
  return result;
};

/**
 * Форматировать данных объявление для карты
 * @param {object} ads
 * @returns {*}
 */
const formatAds = (ads, options) => {
  const result = [];
  ads.forEach((item) => {
    result.push({
      'coordinate': {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      options: options,
      content: () => options.createCard(item),
    });
  });
  return result;
};

export {getRandomIntInclusive, getRandomFloatInclusive, getRandomItem, getRandomArray, formatAds};
