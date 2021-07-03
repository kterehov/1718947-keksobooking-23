/**
 * Время показа пользовательского уведомления
 * @type {number}
 */
const OPENED_TIME = 3000;

/**
 * Обработка ошибок
 * @param message
 */
const showMessage = (message, color) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = color;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, OPENED_TIME);
};

const showSuccessMessage = (messageText) => showMessage(messageText, 'green');
const showFailMessage = (messageText) => showMessage(messageText, 'red');

/**
 * Удаление элемента
 * @param element
 * @returns {*}
 */
const removeModal = (element) => element.remove();

/**
 * Получение темплейта модалки
 * @param templateId
 * @returns {Node}
 */
const getModalTemplate = (templateId) => document.querySelector(templateId).content.cloneNode(true);

/**
 * Добавление окна в DOM
 * @param template
 * @returns {string}
 */
const addModalToDOM = (template) => {
  const identity = `modal${Math.floor(Math.random() * 1000) + 1}`;
  template.children[0].id = identity;
  const body = document.querySelector('body');
  body.appendChild(template);
  return identity;
};

/**
 * IsEscape?
 * @param {object} evt
 * @returns {boolean}
 */
const isEsc = (evt) => (evt.key === 'Escape');

/**
 * Добавление эвентов на модальные окна
 * @param identity
 */
const addModalEvent = (identity) => {
  const modal = document.querySelector(`#${identity}`);

  modal.addEventListener('click', () => removeModal(modal));

  document.addEventListener('keydown', (event) => {
    if(isEsc(event)){
      removeModal(modal);
    }
  });
};

/**
 * Показатель темплейт
 * @param templateId
 */
const addModal = (templateId = '#success') => {
  const templateContent = getModalTemplate(templateId);
  const identity = addModalToDOM(templateContent);
  addModalEvent(identity);
};

export {showSuccessMessage, showFailMessage, addModal};
