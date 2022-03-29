import { getOfferPlaces, getRoomsCapacity } from '../config.js';
import { getOfferFormElements } from './form-config.js';
// import { getCheckedElementList } from './form.js';
// валидация формы

const roomsCapacity = getRoomsCapacity();
const offerPlaces = getOfferPlaces();

// объект Pristine
const createOfferPristineObject = (offerForm) => new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--error',
  // successClass: '',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error-text',
});

// поля для возможной проверки
// const getCheckedElementList = (form) => ({
//   title: form.querySelector('#title'),
//   type: form.querySelector('#type'),
//   price: form.querySelector('#price'),
//   room: form.querySelector('#room_number'),
//   capacity: form.querySelector('#capacity'),
//   checkIn: form.querySelector('#timein'),
//   checkOut: form.querySelector('#timeout'),
// });

const offerValidation = (form, offerPristineValidation) => {

  const checkedElementList = getOfferFormElements(form);

  const validateOfferPrice = () => {
    // const placeByKind = getObjItemByValue(offerPlaceList, 'kind', checkedElementList.type.value);
    const placeByKind = offerPlaces.get(checkedElementList.type.value);
    return checkedElementList.price.value >= placeByKind.minPrice && checkedElementList.price.value <= placeByKind.maxPrice;
  };

  const validateOfferCapacity = () => {
    // const capacityByRoom = getObjItemByValue(offerCapacityList, 'roomValue', checkedElementList.room.value);
    const capacityByRoom = roomsCapacity.get(checkedElementList.room.value);
    return checkedElementList.capacity.value >= capacityByRoom.MIN && checkedElementList.capacity.value <= capacityByRoom.MAX;
  };

  const getPlaceOutOfRangeText = () => {
    // const placeByKind = getObjItemByValue(offerPlaceList, 'kind', checkedElementList.type.value);
    const placeByKind = offerPlaces.get(checkedElementList.type.value);
    return `Цена за ночь не менее ${placeByKind.minPrice} и не более ${placeByKind.maxPrice}`;
  };

  const getCapacityErrorText = () => {
    // const capacityByRoom = getObjItemByValue(offerCapacityList, 'roomValue', checkedElementList.room.value);
    const capacityByRoom = roomsCapacity.get(checkedElementList.room.value);

    if (capacityByRoom.MAX === 0 ) {
      return `Для количества комнат ${capacityByRoom.roomValue} допустимое значение гостей: "${capacityByRoom.description}"  \n Измените количество комнат или количество гостей`;
    } else {
      return `Для ${capacityByRoom.roomValue} комнат(ы) можно указать от "${capacityByRoom.MIN}" до "${capacityByRoom.MAX}" гостей \n Измените количество комнат или количество гостей`;
    }
  };

  // валидаторы
  // offerPristineValidation.addValidator(checkedElementList.title, validateOfferTitle, TITLE_OUT_OF_RANGE);
  offerPristineValidation.addValidator(checkedElementList.price, validateOfferPrice, getPlaceOutOfRangeText);
  offerPristineValidation.addValidator(checkedElementList.capacity, validateOfferCapacity, getCapacityErrorText);
  offerPristineValidation.addValidator(checkedElementList.room, validateOfferCapacity);

  // листинер для валидации
  const validateListener = (evt) => {
    if (!offerPristineValidation.validate()) {
      evt.preventDefault();
    }
  };

  form.addEventListener('submit', validateListener);
};

export { offerValidation, createOfferPristineObject};
