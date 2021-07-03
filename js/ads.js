/**
 * link данных объявления кексобукинга
 * @type {string}
 */
const link = 'https://23.javascript.pages.academy/keksobooking/data';

/**
 * Успешное получение данных
 * @param response
 */
const onSuccess = (response) => response;

/**
 * Настройка запроса
 * @type {{}}
 */
const optionsList = { };

/**
 * Обработчик ошибки
 * @param {string} error
 */
const onFail = (error) => {
  console.log(error);
};

const ads = (request) => request(link, onSuccess, onFail, optionsList);


export {ads};
