import { prepareTestData } from './utils/create-test-data.js';
import { getTestCardFragment } from './map/map-popup.js';
import { disableForm, enableForm } from './form/form.js';

// import './map/map-config.js'; // конфигурация  для карты
// import './map/map.js'; //загрузка и инициализация карты
// import './map/map-filter.js'; // работа с фильтром карты
// import './map/map-popup.js'; // всплывающая карточка на карте
// import './form/check-form.js'; // проверка полей формы
// import './form/form.js'; // работа с формой
// import './alert-popup.js'; // попапы для ошибок
// import './server.js'; // взаимодействие с сервером

const offerForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const cardContent = document.querySelector('#card').content.querySelector('.popup');
const mapTarget = document.querySelector('#map-canvas');

disableForm(offerForm);
disableForm(filterForm);

// getTestCardFragment(cardContent, prepareTestData());

mapTarget.appendChild(getTestCardFragment(cardContent, prepareTestData()));

enableForm(offerForm);
enableForm(filterForm);
