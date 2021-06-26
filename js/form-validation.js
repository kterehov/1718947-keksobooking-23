import {validityState} from './form-variables.js';

/**
 * Универсальная функция валидации элементов
 * @param {object} element
 * @param {boolean} report
 */
const validate = (element, report = false) => {
  const currentElement = element.object;
  const message = [];

  for (const key in element.rules) {
    if (currentElement.validity[element.rules[key].type]) {
      const currentRule = element.rules[key];
      if (currentRule.type === validityState.tooShort) {
        const currentValue = currentElement.value.length;
        message.push(currentRule.text.replace('{value}', currentRule.value - currentValue));
      } else if (currentRule.type === validityState.tooLong) {
        const currentValue = currentElement.value.length;
        message.push(currentRule.text.replace('{value}', currentRule.value - currentValue));
      } else if (currentRule.type === validityState.rangeOverflow) {
        message.push(currentRule.text.replace('{value}', currentRule.value));
      } else if (currentRule.type === validityState.valueMissing ){
        message.push(currentRule.text);
      } else if (currentRule.type === validityState.rangeUnderflow ){
        message.push(currentRule.text.replace('{value}', currentRule.value));
      }
    }
  }

  if (message) {
    currentElement.setCustomValidity(message.join('\\n'));
  } else {
    currentElement.setCustomValidity('');
  }

  if (report) {
    currentElement.reportValidity();
  }
};

export {validate};
