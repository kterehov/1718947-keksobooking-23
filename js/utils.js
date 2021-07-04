/**
 * Форматировать данных объявление для карты
 * @param {object} ads
 * @returns {*}
 */
const formatAds = (ads, options) => (ads.map((item) => ({
  'coordinate': item.location,
  options: options,
  content: () => options.createCard(item),
})));

export {formatAds};
