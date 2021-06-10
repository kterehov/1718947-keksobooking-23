import {getRandomFloatInclusive, getRandomIntInclusive, getRandomItem, getRandomArray} from './utils.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const RANGE_ROOMS = {min: 1, max: 10};
const RANGE_QUESTS = {min: 1, max: 20};
const RANGE_PRICE = {min: 10000, max: 90000};
const LOCATION = {
  lat: {
    min: 35.65000,
    max: 35.70000,
    point: 5,
  },
  lng: {
    min: 139.70000,
    max: 139.80000,
    point: 5,
  },
};
const TITLE = 'Есть над чем задуматься.';
const DESCRIPTION = 'Задача организации, в особенности же постоянный количественный рост и сфера нашей активности требуют от нас анализа систем массового участия.';

/**
 * Генератор чисел для аватарок
 *
 * @param cnt
 * @returns {any[]}
 */
const getAvatarNumber = (cnt) => {
  const picturesNumber = [];
  let number = 1;
  let buf;
  while (picturesNumber.length < cnt) {
    buf = (number++).toString();
    if (buf.includes('9')) {
      buf = (number++).toString();
    }
    if (buf.length < 2) {
      buf = `0${buf}`;
    }
    picturesNumber.push(buf);
  }
  return picturesNumber;
};

/**
 * Генератор аватарки
 *
 * @returns {string}
 */
const getAvatar = (number) => (`img/avatars/user${number}.png`);

/**
 * Генератор объявления
 *
 * @param {number} number
 * @returns {object}
 */
const item = (number) => {
  const author = {
    avatar: getAvatar(number),
  };

  const location = {
    lat: getRandomFloatInclusive(LOCATION.lat.min, LOCATION.lat.max, LOCATION.lat.point),
    lng: getRandomFloatInclusive(LOCATION.lng.min, LOCATION.lng.max, LOCATION.lng.point),
  };

  const offer = {
    title: TITLE,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomIntInclusive(RANGE_PRICE.min, RANGE_PRICE.max),
    type: getRandomItem(TYPES),
    rooms: getRandomIntInclusive(RANGE_ROOMS.min, RANGE_ROOMS.max),
    guests: getRandomIntInclusive(RANGE_QUESTS.min, RANGE_QUESTS.max),
    checkin: getRandomItem(TIMES),
    checkout: getRandomItem(TIMES),
    features: getRandomArray(FEATURES),
    description: DESCRIPTION,
    photos: getRandomArray(PHOTOS),
  };

  return {
    author,
    offer,
    location,
  };
};

/**
 * Массив объявлений
 *
 * @param count
 * @returns {object}
 */
const ads = (count) => (new Array(...getAvatarNumber(count)).map((key) => item(key)));

export{ads};
