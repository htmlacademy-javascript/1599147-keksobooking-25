// //модуль работы с формой
import { getOfferPlaces } from '../config.js';
import { offerValidation, createOfferPristineObject, getCheckedElementList } from './validate-form.js';

// const placeList = getOfferPlace();
const places = getOfferPlaces();

const disableElement = (element) => element.setAttribute('disabled', '');
const enableElement  = (element)=>element.removeAttribute('disabled');

const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
  [...form.elements].forEach(disableElement);
};

const enableForm = (form) => {
  form.classList.remove('ad-form--disabled');
  [...form.elements].forEach(enableElement);
};

const createSyncElements= (srcElement, destElement) => {
  const syncElementFunction = () => {
    destElement.value = srcElement.value;
  };
  return syncElementFunction;
};

const createCapacityChange = (pristineObject, room, capacity) => {
  const setCapacityChangeValidation = () => {
    pristineObject.validate(room);
    pristineObject.validate(capacity);
  };
  return setCapacityChangeValidation;
};


const prepareOfferForm = (offerForm) => {

  const offerPristineObject = createOfferPristineObject(offerForm);
  const formElementList = getCheckedElementList(offerForm);

  offerValidation(offerForm, offerPristineObject);

  const onPlaceChange = (evt) => {
    // formElementList.price.placeholder = getObjItemByValue(placeList, 'kind', evt.target.value).minPrice;
    formElementList.price.placeholder = places.get(evt.target.value).minPrice;
    formElementList.price.setAttribute('min', places.get(evt.target.value).minPrice);
    offerPristineObject.validate(formElementList.price);
  };

  // const onCapacityChange = () => {
  //   offerPristineObject.validate(formElementList.room);
  //   offerPristineObject.validate(formElementList.capacity);
  // };

  const onCapacityChange = createCapacityChange(offerPristineObject, formElementList.room, formElementList.capacity);
  // console.log(onCapacityChange);


  const onCheckTimeChangeListener = (srcElement, destElement) => {
    srcElement.addEventListener('change', createSyncElements(srcElement, destElement));
  };

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
  onRoomChangeListener(formElementList, offerPristineObject);
  onCapacityChangeListener(formElementList, offerPristineObject);
  onCheckTimeChangeListener(formElementList.checkIn, formElementList.checkOut);
  onCheckTimeChangeListener(formElementList.checkOut, formElementList.checkIn);
};

export { disableForm, enableForm, prepareOfferForm, getCheckedElementList };
// onPlaceChangeListener
