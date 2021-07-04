import {storageAdForm, roomNumberToCapacity, currentTypeToPrice, storageMapFilterForm} from './form-variables.js';
import {validate} from './form-validation.js';

/**
 * Управление выключение элементов и селектов
 * @param {object} element
 * @param {array} values
 */
const toggle = (element, values) => {
  const options = element.querySelectorAll('option');
  options.forEach((item) => {
    if (values.includes(item.value)) {
      if (item.hasAttribute('disabled')) {
        item.removeAttribute('disabled');
      }
      item.selected = 'selected';
    } else {
      if (item.hasAttribute('selected')) {
        item.removeAttribute('selected');
      }
      item.setAttribute('disabled', 'disabled');
    }
  });
};

/**
 * Изменение комнат и мест
 * @param {object} room
 * @param {object} capacity
 * @param {object} roomToCapacity
 */
const changeRoomNumberToCapacity = (room, capacity, roomToCapacity) => {
  const rooms = roomToCapacity[room.value] || [];
  toggle(capacity, rooms);
};

/**
 * Изменение времени
 * @param {object} from
 * @param {object} to
 */
const changeTime = (from, to) => {
  to.value = from.value;
};

/**
 * Отправка формы
 * @param {function} request
 */
const submitFormEvent = (request) => {
  storageAdForm.el.adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    request(formData);
  });
};

/**
 * Сброс формы
 * @returns {*}
 */
const resetDefaultValuesForm = () => {
  storageAdForm.el.adForm.reset();
  storageMapFilterForm.el.mapFilterForm.reset();
};

/**
 * Эвент на зависимость между комнатами и местами
 */
storageAdForm.el.adForm.addEventListener('change', (evt) => {
  const target = evt.target;
  const formElement = storageAdForm.el;
  if (target === formElement.inputAdFormRoomNumber) {
    changeRoomNumberToCapacity(target, formElement.inputAdFormCapacity, roomNumberToCapacity);
  }

  if (target === formElement.inputAdFormType) {
    currentTypeToPrice();
  }

  if (target === formElement.inputAdFormTimeIn) {
    changeTime(target, formElement.inputAdFormTimeOut);
  }

  if (target === formElement.inputAdFormTimeOut) {
    changeTime(target, formElement.inputAdFormTimeIn);
  }
});

/**
 * Создание эвентов на валидацию и живое изменение
 */
for (const eventElement in storageAdForm.vl) {
  storageAdForm.vl[eventElement].object.addEventListener('invalid', () => {
    validate(storageAdForm.vl[eventElement], false);
  });

  storageAdForm.vl[eventElement].object.addEventListener('input', () => {
    validate(storageAdForm.vl[eventElement], true);
  });
}

/**
 * Дефолтное значение у комнат - мест при загрузке страницы
 */
changeRoomNumberToCapacity(storageAdForm.el.inputAdFormRoomNumber, storageAdForm.el.inputAdFormCapacity, roomNumberToCapacity);

/**
 * Дефолтное значение у цены за ночь с валидацией
 */
currentTypeToPrice();

export {submitFormEvent, resetDefaultValuesForm};
