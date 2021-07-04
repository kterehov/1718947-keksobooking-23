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

  if(!value){
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

  if(!links){
    photoList.removeChild(photoTemplate);
    return;
  }

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
  const offer = item.offer;
  changeTextElement(card, '.popup__title', offer.title);
  changeTextElement(card, '.popup__text--address', offer.address);
  changeTextElement(card, '.popup__text--price', `${offer.price} ₽/ночь`);
  changeTextElement(card, '.popup__type', translate[offer.type]);
  changeTextElement(card, '.popup__text--capacity', `${offer.rooms} комнаты для ${offer.guests} гостей`);
  changeTextElement(card, '.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  changeTextElement(card, '.popup__features', offer.features);
  changeTextElement(card, '.popup__description', offer.description);
  createPhotosBlock(card, offer.photos);
  const photoAvatar = card.querySelector('.popup__avatar');
  photoAvatar.setAttribute('src', item.author.avatar);
  return card;
};

export {createCard};
