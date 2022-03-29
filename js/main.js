
import { disableForm, enableForm, prepareOfferForm, disableSlider, enableSlider } from './form/form.js';
import { getMapId } from './map/map-config.js';
import { mapInit, mapAddLayer, mapInitMainMarker, mapInitOfferMarkers } from './map/map.js';
import { loadData } from './server.js';
import { createSuccessFormPopup, createErrorFormPopup, createLoadErrorPopup } from './alert-popup.js';

const offerForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const cardContent = document.querySelector('#card').content.querySelector('.popup');
// const sliderElement = document.querySelector('.ad-form__slider');
// const inputElement = offerForm.querySelector('#price');
const templateSuccessFormPopup = document.querySelector('#success').content.querySelector('.success');
const templateErrorFormPopup = document.querySelector('#error').content.querySelector('.error');
const popupFormDestination = document.body;
const mapContainer = document.querySelector('.map');

const openSuccessFormPopup = createSuccessFormPopup(popupFormDestination, templateSuccessFormPopup);
const openErrorFormPopup = createErrorFormPopup(popupFormDestination, templateErrorFormPopup);

if (offerForm) {
  disableForm(offerForm);
  disableSlider(offerForm);
}
if (filterForm) {
  disableForm(filterForm);
}

const initForm = () => {
  if (offerForm) {
    enableForm(offerForm);
    enableSlider(offerForm);
  }
  if (filterForm) {
    enableForm(filterForm);
  }
};

const mapObject = mapInit(getMapId(), initForm);
mapAddLayer(mapObject);
mapInitMainMarker(mapObject, offerForm);

const initOfferMarkers = mapInitOfferMarkers(mapObject, cardContent);

const openErrorLoadPopup = createLoadErrorPopup(mapContainer, reloadMapCallback);

function reloadMapCallback() { loadData(initOfferMarkers, openErrorLoadPopup); }

loadData(initOfferMarkers, openErrorLoadPopup);

prepareOfferForm(offerForm, openSuccessFormPopup, openErrorFormPopup);
