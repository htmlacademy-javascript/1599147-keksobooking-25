
import { disableForm, enableForm, prepareOfferForm, disableSlider, enableSlider } from './form/form.js';
import { getMapId } from './map/map-config.js';
import { mapInit, mapAddLayer, mapInitMainMarker, mapInitOfferMarkers, createRemoveMarkerPopUp, createLayerGroup } from './map/map.js';
import { loadData } from './server.js';
import { createSuccessFormPopup, createErrorFormPopup, createLoadErrorPopup } from './alert-popup.js';
import { createFilteredDataset } from './map/map-filter.js';
import { debounce } from './utils/utils.js';


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
};

const mapObject = mapInit(getMapId(), initForm);
mapAddLayer(mapObject);

const layerGroup = createLayerGroup(mapObject);

mapInitMainMarker(mapObject, offerForm);

const initOfferMarkers = mapInitOfferMarkers(mapObject, cardContent, layerGroup);

const removeMarkerPopUp = createRemoveMarkerPopUp(mapContainer);

const filterDataset = createFilteredDataset(filterForm);

const changeFilterHandler = (dataSet) => {
  removeMarkerPopUp();
  layerGroup.clearLayers();
  initOfferMarkers(filterDataset(dataSet));
  // initOfferMarkers(debounsedFilterDataset(dataSet));
};

const debounseFilterHandler = debounce(changeFilterHandler);

const filterOffset = (dataSet) => {
  filterForm.addEventListener('change', () => {
    // changeFilterHandler(dataSet);
    debounseFilterHandler(dataSet);
  });
};

const successLoadDataHandler = (offers) => {
  initOfferMarkers(offers);
  enableForm(filterForm);
  filterOffset(offers);
};

const errorLoadHandler= createLoadErrorPopup(mapContainer, reloadMapCallback);

function reloadMapCallback() {loadData( successLoadDataHandler, errorLoadHandler); }

loadData(successLoadDataHandler, errorLoadHandler);

prepareOfferForm(offerForm, filterForm, openSuccessFormPopup, openErrorFormPopup);
