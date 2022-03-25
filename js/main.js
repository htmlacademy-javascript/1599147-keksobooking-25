import { prepareTestData } from './utils/create-test-data.js';
import { disableForm, enableForm, prepareOfferForm } from './form/form.js'; // работа с формой onPlaceChangeListener
import { getTestCardFragment } from './map/map-popup.js'; // всплывающая карточка на карте
import { getMapId,  } from './map/map-config.js';
import { mapInit, mapAddLayer, mapInitMainMarker, mapSetOfferMarker } from './map/map.js'; // работа с картой
// import { offerValidation } from './form/validate-form.js';

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

// mapTarget.appendChild(getTestCardFragment(cardContent, prepareTestData()));

const initForm = () => {
  if (offerForm) {
    enableForm(offerForm);
  }
  if (filterForm) {
    enableForm(filterForm);
  }
  prepareOfferForm(offerForm);
};

const mapObject = mapInit(getMapId(), initForm);

mapAddLayer(mapObject);

mapInitMainMarker(mapObject, offerForm);

prepareTestData().forEach((offerItem) =>  mapSetOfferMarker(mapObject, offerItem, cardContent));

// onPlaceChangeListener(offerForm);


// const validateOffer = new Pristine(offerForm);

// const addOfferListener = (form) => {
//   form.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     const isValid = validateOffer.validate();
//     if (isValid) {
//       console.log('valid');
//     } else {
//       console.log('noValid');
//     }
//   });
// };

// addOfferListener(offerForm);

// делаем шаблонные - элементарные проверки на основе разметки
// делаем более сложные проверки
// выносим в модуль
