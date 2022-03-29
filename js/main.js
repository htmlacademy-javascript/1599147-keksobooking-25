import { prepareTestData } from './utils/create-test-data.js';
import { disableForm, enableForm, prepareOfferForm, disableSlider, enableSlider } from './form/form.js'; // работа с формой onPlaceChangeListener
// import { getTestCardFragment } from './map/map-popup.js'; // всплывающая карточка на карте
import { getMapId } from './map/map-config.js';
import { mapInit, mapAddLayer, mapInitMainMarker, mapSetOfferMarker } from './map/map.js'; // работа с картой
import { createSliderObject, setSliderListeners } from './slider/slider.js';
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
const sliderElement = document.querySelector('.ad-form__slider');
const inputElement = offerForm.querySelector('#price');
// const mapTarget = document.querySelector('#map-canvas');

if (offerForm) {
  disableForm(offerForm);
  disableSlider(offerForm);
}
if (filterForm) {
  disableForm(filterForm);
}

// getTestCardFragment(cardContent, prepareTestData());

// mapTarget.appendChild(getTestCardFragment(cardContent, prepareTestData()));

const initForm = () => {
  if (offerForm) {
    enableForm(offerForm);
    enableSlider(offerForm);
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

createSliderObject(sliderElement, inputElement);
setSliderListeners(sliderElement, inputElement);
