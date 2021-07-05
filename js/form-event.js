import {storageAdForm, roomNumberToCapacity, setTypeToPrice, storageMapFilterForm} from './form-variables.js';
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
 * Проверка при отправке формы
 * @param {object} room
 * @param {capacity} capacity
 * @param {object} roomToCapacity
 * @returns {*}
 */
const checkRoomNumberToCapacity = (room, capacity, roomToCapacity) => roomToCapacity[room.value].includes(capacity.value);

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
 * @param {function} showFailMessage
 */
const submitFormEvent = (request, showFailMessage) => {
  storageAdForm.el.adForm.addEventListener('submit', (evt) => {

    evt.preventDefault();

    const formElement = storageAdForm.el;
    if (checkRoomNumberToCapacity(formElement.inputAdFormRoomNumber, formElement.inputAdFormCapacity, roomNumberToCapacity)) {
      const formData = new FormData(evt.target);
      request(formData);
    } else {
      showFailMessage('Что-то пошло не так, но мы все поправили. Повторите отправку');
      changeRoomNumberToCapacity(formElement.inputAdFormRoomNumber, formElement.inputAdFormCapacity, roomNumberToCapacity);
    }

  });
};

/**
 * Сброс формы
 * @returns {*}
 */
const resetDefaultValuesForm = () => {
  const adForm = storageAdForm.el;
  adForm.adForm.reset();
  adForm.inputAdFormAvatarPreview.children[0].src = 'img/muffin-grey.svg';
  adForm.inputAdFormImagesPreview.children[0].src ='img/home.svg';
  storageMapFilterForm.el.mapFilterForm.reset();
};

/**
 * Добавление превью фото
 * @param fileSource
 * @param preview
 */
const addEventPreviewImage = (fileSource, preview) => {
  fileSource.addEventListener('change', () => {
    const file = fileSource.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        preview.children[0].src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
};

addEventPreviewImage(storageAdForm.el.inputAdFormAvatar, storageAdForm.el.inputAdFormAvatarPreview);
addEventPreviewImage(storageAdForm.el.inputAdFormImages, storageAdForm.el.inputAdFormImagesPreview);

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
    setTypeToPrice();
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
setTypeToPrice();

export {submitFormEvent, resetDefaultValuesForm};
