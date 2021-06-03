/**
 * Функция валидации
 *
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
function validateRandomNumber(min,max){
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
  if(validateRandomNumber(min, max)===false) {
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
  return getRandomIntInclusive(min*point, max*point)/point;
}

getRandomFloatInclusive(1, 10, 3);
