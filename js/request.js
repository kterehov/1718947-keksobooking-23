/**
 * Интерфейс запросов
 * @param {string} link
 * @param {function} onSuccess
 * @param {function}  onFail
 * @param {object} optionsList
 */
const request = (link, onSuccess, onFail, optionsList= {}) => {
  fetch(
    link,
    optionsList,
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onFail);
};

export {request};
