const interactiveEl = {
  '.map__filters': [
    '.map__filter',
    '.map__features',
  ],
  '.ad-form' : [
    '.ad-form-header__input',
    '.ad-form__element',
  ],
};

/**
 * Деактивация и активация формы
 *
 * @param {boolean} disable
 */
const toggleForms = (disable = true) => {
  for (const selectorForm in interactiveEl) {
    const currentForm = document.querySelector(selectorForm);
    disable ? currentForm.classList.add('ad-form--disabled') : currentForm.classList.remove('ad-form--disabled');
    for (const selectorElements in interactiveEl[selectorForm]) {
      const currentElements = currentForm.querySelectorAll(interactiveEl[selectorForm][selectorElements]);
      currentElements.forEach((element) => {
        disable ? element.setAttribute('disabled', 'disabled') : element.removeAttribute('disabled');
      });
    }
  }
};

export {toggleForms};
