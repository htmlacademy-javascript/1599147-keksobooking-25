import { prepareTestData } from './utils/create-test-data.js';
import { getTestCardFragment } from './map/map-popup.js'; // всплывающая карточка на карте
import { disableForm, enableForm } from './form/form.js'; // работа с формой

// import './map/map-config.js'; // конфигурация  для карты
// import './map/map.js'; //загрузка и инициализация карты
// import './map/map-filter.js'; // работа с фильтром карты
// import './form/check-form.js'; // проверка полей формы
// import './alert-popup.js'; // попапы для ошибок
// import './server.js'; // взаимодействие с сервером

const offerForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const cardContent = document.querySelector('#card').content.querySelector('.popup');
const mapTarget = document.querySelector('#map-canvas');

if (offerForm) {
  disableForm(offerForm);
}
if (filterForm) {
  disableForm(filterForm);
}

// getTestCardFragment(cardContent, prepareTestData());

mapTarget.appendChild(getTestCardFragment(cardContent, prepareTestData()));

if (offerForm) {
  enableForm(offerForm);
}
if (filterForm) {
  enableForm(filterForm);
}
