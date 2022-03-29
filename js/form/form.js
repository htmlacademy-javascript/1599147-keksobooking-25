// //модуль работы с формой
import { getOfferPlaces } from '../config.js';
import { getOfferFormElements, getAddressPrecision,  } from './form-config.js';
import { formatAddressByLocation } from '../utils/utils.js';
// import { getMapInitCenter } from '../map/map-config.js';
import { resetMainMarker } from '../map/map.js';
import { offerValidation, createOfferPristineObject } from './validate-form.js';
import { postData } from '../server.js';
import { createSliderObject, setSliderListeners } from '../slider/slider.js';

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
  // console.log(offerForm);
  // console.log(location);
  getOfferFormElements(offerForm).address.value = formatAddressByLocation(location, getAddressPrecision());
  // console.log(getOfferFormElements(offerForm).address.value);
};

// const createResetForm = (offerForm) => () => {
// // console.log('reset function');
//   offerForm.reset();
// };

const setOffervalidation = (offerForm, offerPristineObject, formElementList) => {

  offerValidation(offerForm, offerPristineObject);

  const onPlaceChange = (evt) => {
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

const prepareOfferForm = (offerForm, successPopup, errorPopup) => {
  const offerPristineObject = createOfferPristineObject(offerForm);
  const formElementList = getOfferFormElements(offerForm);

  createSliderObject(formElementList.priceSlider, formElementList.price);
  setSliderListeners(formElementList.priceSlider, formElementList.price);

  setOffervalidation(offerForm, offerPristineObject, formElementList);

  const resetForm = () => {
    // console.log('reset function');
    offerForm.reset();
    formElementList.priceSlider.noUiSlider.reset();
    resetMainMarker(offerForm);
  };

  const onSuccessSendForm = () => {
    successPopup();
    resetForm();
  };

  const onResetForm = () => {
    // evt.preventDefault();
    resetForm();
  };

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    const isFormValid = offerPristineObject.validate();
    if (isFormValid) {
      const formData = new FormData(evt.target);
      postData(onSuccessSendForm, errorPopup, formData);
    }
  };

  offerForm.addEventListener('submit', onSubmitForm);
  offerForm.addEventListener('reset', onResetForm);
};

export { disableForm, enableForm, prepareOfferForm, setOfferAddress, disableSlider, enableSlider };
