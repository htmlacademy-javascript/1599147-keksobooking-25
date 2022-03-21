// //модуль работы с формой
import { getOfferPlace, getObjItemByValue } from '../config.js';
import { offerValidation, createOfferPristineObject } from './validate-form.js';

const placeList = getOfferPlace();

// const disableElementList = (elementList) => {
//   Object.values(elementList).forEach((element) => element.setAttribute('disabled', ''));
// };

// const enableElementList = (elementList) => {
//   Object.values(elementList).forEach((element) => element.removeAttribute('disabled'));
// };

// const getFormElementList = (form) => {
//   // const elementList = form.querySelectorAll('fieldset, select');
//   const elementList = form.elements;
//   return elementList;
// };

const disableElement = (element) => element.setAttribute('disabled', '');
const enableElement  = (element)=>element.removeAttribute('disabled');


const disableForm = (form) => {
  // form.classList.add('ad-form--disabled');
  // const formElementList = getFormElementList(form);
  // disableElementList(formElementList);
  [...form.elements].forEach(disableElement);
};

const enableForm = (form) => {
  // form.classList.remove('ad-form--disabled');
  // const formElementList = getFormElementList(form);
  // enableElementList(formElementList);
  [...form.elements].forEach(enableElement);
};

const getCheckedElementList = (form) => {
  const formElementList = {
    title: form.querySelector('#title'),
    type: form.querySelector('#type'),
    price: form.querySelector('#price'),
    room: form.querySelector('#room_number'),
    capacity: form.querySelector('#capacity'),
  };
  return formElementList;
};


const prepareOfferForm = (offerForm) => {

  const offerPristineObject = createOfferPristineObject(offerForm);

  const formElementList = getCheckedElementList(offerForm);

  offerValidation(offerForm, offerPristineObject);

  const onPlaceChange = (evt) => {
    formElementList.price.placeholder = getObjItemByValue(placeList, 'kind', evt.target.value).minPrice;
    offerPristineObject.validate(formElementList.price);
  };

  const onCapacityChange = () => {
    offerPristineObject.validate(formElementList.room);
    offerPristineObject.validate(formElementList.capacity);
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

};

export { disableForm, enableForm, prepareOfferForm, getCheckedElementList };
// onPlaceChangeListener
