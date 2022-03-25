// //модуль работы с формой
import { getOfferPlaces } from '../config.js';
import { getOfferFormElements, getAddressPrecision } from './form-config.js';
import { formatAddressByLocation } from '../utils/utils.js';
import { offerValidation, createOfferPristineObject } from './validate-form.js';

// const placeList = getOfferPlace();
const places = getOfferPlaces();

const disableElement = (element) => element.setAttribute('disabled', '');
const enableElement  = (element)=>element.removeAttribute('disabled');

const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
  [...form.elements].forEach(disableElement);
};

const disableSlider = (form) =>  disableElement(getOfferFormElements(form).priceSlider);
const enableSlider = (form) =>  enableElement(getOfferFormElements(form).priceSlider);

const enableForm = (form) => {
  form.classList.remove('ad-form--disabled');
  [...form.elements].forEach(enableElement);
};

const createSyncElements = (srcElement, destElement) => () => {
  destElement.value = srcElement.value;
};

const createCapacityChange = (pristineObject, room, capacity) => () => {
  pristineObject.validate(room);
  pristineObject.validate(capacity);
};

const onCheckTimeChangeListener = (srcElement, destElement) => {
  srcElement.addEventListener('change', createSyncElements(srcElement, destElement));
};

const setOfferAddress = (offerForm) => (location) => {
  getOfferFormElements(offerForm).address.value = formatAddressByLocation(location, getAddressPrecision());
};

const prepareOfferForm = (offerForm) => {
  const offerPristineObject = createOfferPristineObject(offerForm);
  const formElementList = getOfferFormElements(offerForm);

  offerValidation(offerForm, offerPristineObject);

  const onPlaceChange = (evt) => {
    // formElementList.price.placeholder = getObjItemByValue(placeList, 'kind', evt.target.value).minPrice;
    formElementList.price.placeholder = places.get(evt.target.value).minPrice;
    formElementList.price.setAttribute('min', places.get(evt.target.value).minPrice);
    offerPristineObject.validate(formElementList.price);
  };

  const onCapacityChange = createCapacityChange(offerPristineObject, formElementList.room, formElementList.capacity);

  const onPlaceChangeListener = () => {
    formElementList.type.addEventListener('change', (evt) => onPlaceChange(evt));
  };

  const onRoomChangeListener = () => {
    formElementList.room.addEventListener('change', onCapacityChange);
  };

  const onCapacityChangeListener = () => {
    formElementList.capacity.addEventListener('change', onCapacityChange);
  };

  onPlaceChangeListener(offerForm);
  onRoomChangeListener(formElementList.room, onCapacityChange);
  onCapacityChangeListener(formElementList.capacity, onCapacityChange);
  onCheckTimeChangeListener(formElementList.checkIn, formElementList.checkOut);
  onCheckTimeChangeListener(formElementList.checkOut, formElementList.checkIn);
};

export { disableForm, enableForm, prepareOfferForm, setOfferAddress, disableSlider, enableSlider };
