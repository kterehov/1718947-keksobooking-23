const template = document.querySelector('#card').content;
const translate = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

/**
 * Изменение текста узла
 *
 * @param {object} card
 * @param {string} selector
 * @param {string|array} value
 */
const changeTextElement = (card, selector, value) => {
  const element = card.querySelector(selector);

  if(value.length===0){
    element.classList.add('hidden');
  }

  element.textContent = value;
};

/**
 * Добавление фотографий
 *
 * @param {object} card
 * @param {array} links
 */
const createPhotosBlock = (card, links) => {
  const photoTemplate = card.querySelector('.popup__photo');
  const photoList = card.querySelector('.popup__photos');
  links.forEach((link) => {
    const photo = photoTemplate.cloneNode();
    photo.setAttribute('src', link);
    photoList.appendChild(photo);
  });
  photoList.removeChild(photoTemplate);
};

/**
 * Создание карточек
 * @param {object} item
 */
const createCard = (item) => {
  const card = template.cloneNode(true);
  changeTextElement(card, '.popup__title', item.offer.title);
  changeTextElement(card, '.popup__text--address', item.offer.address);
  changeTextElement(card, '.popup__text--price', `${item.offer.price} ₽/ночь`);
  changeTextElement(card, '.popup__type', translate[item.offer.type]);
  changeTextElement(card, '.popup__text--capacity', `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`);
  changeTextElement(card, '.popup__text--time', `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`);
  changeTextElement(card, '.popup__features', item.offer.features);
  changeTextElement(card, '.popup__description', item.offer.description);
  createPhotosBlock(card, item.offer.photos);
  const photoAvatar = card.querySelector('.popup__avatar');
  photoAvatar.setAttribute('src', item.author.avatar);
  return card;
};

export {createCard};
