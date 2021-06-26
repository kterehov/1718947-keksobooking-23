import {storageAdForm, storageMapFilterForm} from './form-variables.js';

const interactiveEl = {
  adForm: {
    'form': storageAdForm.el.adForm,
    'disableList': [
      '.map__filter',
      '.map__features',
    ],
  },
  mapFilterForm: {
    'form': storageMapFilterForm.el.mapFilterForm,
    'disableList': [
      '.ad-form-header__input',
      '.ad-form__element',
    ],
  },
};

/**
 * Деактивация и активация формы
 *
 * @param {boolean} disable
 */
const toggleForms = (disable = true) => {
  for (const selectorForm in interactiveEl) {
    const currentForm = interactiveEl[selectorForm].form;

    if (disable) {
      currentForm.classList.add('ad-form--disabled');
    } else {
      currentForm.classList.remove('ad-form--disabled');
    }

    for (const selectorElements in interactiveEl[selectorForm].disableList) {
      const currentElements = currentForm.querySelectorAll(interactiveEl[selectorForm][selectorElements]);
      currentElements.forEach((element) => {

        if (disable) {
          element.setAttribute('disabled', 'disabled');
        } else {
          element.removeAttribute('disabled');
        }

      });
    }
  }
};

export {toggleForms};
