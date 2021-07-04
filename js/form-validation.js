import {validityState} from './form-variables.js';

/**
 * Универсальная функция валидации элементов
 * @param {object} element
 * @param {boolean} report
 */
const validate = (element, report = false) => {
  const currentElement = element.object;
  const messages = [];
  for (const currentRule of Object.values(element.rules)){
    if (currentElement.validity[currentRule.type]) {
      switch (currentRule.type) {
        case validityState.tooShort:
          messages.push(currentRule.text.replace(
            '{value}',
            currentRule.value - currentElement.value.length),
          );
          break;
        case validityState.tooLong:
          messages.push(currentRule.text.replace(
            '{value}',
            currentRule.value - currentElement.value.length),
          );
          break;
        case validityState.rangeOverflow:
          messages.push(currentRule.text.replace('{value}', currentRule.value));
          break;
        case validityState.valueMissing:
          messages.push(currentRule.text);
          break;
        case validityState.rangeUnderflow:
          messages.push(currentRule.text.replace('{value}', currentRule.value));
          break;
      }
    }
  }

  currentElement.setCustomValidity(messages.join('\\n'));

  if (report) {
    currentElement.reportValidity();
  }
};

export {validate};
