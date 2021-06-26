/**
 * Универсальная функция валидации элементов
 * @param {object} element
 * @param {boolean} report
 */
function validate(element, report = false) {
  const currentElement = element.object;
  const message = [];

  for (const key in element.rules) {
    if (currentElement.validity[key]) {
      const currentRule = element.rules[key];
      if (key === 'tooShort') {
        const currentValue = currentElement.value.length;
        message.push(currentRule.text.replace('{value}', currentRule.value - currentValue));
      } else if (key === 'tooLong') {
        const currentValue = currentElement.value.length;
        message.push(currentRule.text.replace('{value}', currentRule.value - currentValue));
      } else if (key === 'rangeOverflow') {
        message.push(currentRule.text.replace('{value}', currentRule.value));
      } else {
        message.push(currentRule.text);
      }
    }
  }

  if(message){
    currentElement.setCustomValidity(message.join('\\n'));
  }else{
    currentElement.setCustomValidity('');
  }

  if (report) {
    currentElement.reportValidity();
  }
}

export {validate};
