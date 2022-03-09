// text
// import {getRandomFloat, getRandomInteger, getUnicRangomArray, getNonUnicRangomArray} from './utils/utils.js';
// import { getOfferTitle, getOfferPlace, getCheckinTime, getCheckoutTime, getFeatures, getDescriptions, getPhotos } from './config.js';

import { prepareTestData } from './utils/create-test-data.js';

import './map/map-config.js'; // конфигурация  для карты
import './map/map.js'; //загрузка и инициализация карты
import './map/map-filter.js'; // работа с фильтром карты
import './map/map-popup.js'; // всплывающая карточка на карте
import './form/check-form.js'; // проверка полей формы
import './form/form.js'; // работа с формой
import './alert-popup.js'; // попапы для ошибок
import './server.js'; // взаимодействие с сервером

prepareTestData();
// console.log(prepareTestData());
