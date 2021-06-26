/**
 * Форма объявлений
 * @type {Element}
 */
const adForm = document.querySelector('.ad-form');

/**
 * Фильтрация форма
 * @type {Element}
 */
const mapFilterForm = document.querySelector('.map__filters');

/**
 * Количество комнат
 * @type {Element}
 */
const inputAdFormRoomNumber = adForm.querySelector('#room_number');

/**
 * Количество мест
 * @type {Element}
 */
const inputAdFormCapacity = adForm.querySelector('#capacity');

/**
 * Ввод заголовка объявлений
 * @type {Element}
 */
const inputAdFormTitle = adForm.querySelector('#title');

/**
 * Ввод цены
 * @type {Element}
 */
const inputAdFormPrice = adForm.querySelector('#price');


/**
 * Зависимость комнат и количества мест
 * @type {object}
 */
const roomNumberToCapacity = {
  1 : [ '1' ],
  2 : ['1', '2'],
  3 : ['1', '2', '3'],
  100 : ['0'],
};

/**
 * Форма AdForm, все объекты и валидация
 *
 * @type {object}
 */
const storageAdForm = {
  el : {
    adForm,
    inputAdFormRoomNumber,
    inputAdFormTitle,
    inputAdFormCapacity,
  },
  vl : {
    inputAdFormTitle : {
      'object' : inputAdFormTitle,
      'rules' : {
        'tooShort' : {
          'value': 30,
          'text':  'Ещё {value} симв.',
        },
        'tooLong' : {
          'value': 100,
          'text':  'Удалите лишние {value} симв.',
        },
        'valueMissing': {
          'text' : 'Заголовок объявления обязательное поле',
        },
      },
    },
    inputAdFormPrice : {
      'object' : inputAdFormPrice,
      'rules' : {
        'rangeOverflow' : {
          'value': 1000000,
          'text':  'Максимальная цена за ночь {value}.',
        },
        'valueMissing': {
          'text' : 'Цена объявления обязательное поле',
        },
      },
    },
  },
};

export {adForm, mapFilterForm, roomNumberToCapacity, storageAdForm};
