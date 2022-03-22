import { getOfferPlaces, getRoomsCapacity } from '../config.js';
import { getCheckedElementList } from './form.js';
// валидация формы

const TITLE_MIN = 30;
const TITLE_MAX = 100;
const TITLE_OUT_OF_RANGE = `Значение должно быть не менее ${TITLE_MIN} и не более ${TITLE_MAX} знаков`;

// const offerPlaceList = getOfferPlace();
// const offerCapacityList = getPlaceCapacity();

const roomsCapacity = getRoomsCapacity();
const offerPlaces = getOfferPlaces();
// console.log(offerPlaces.get('flat').maxPrice);

const createOfferPristineObject = (offerForm) => new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--error',
  // successClass: '',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error-text',
});

// const offerPristineValidation = createOfferPristineObject(form);

const offerValidation = (form, offerPristineValidation) => {

  const checkedElementList = getCheckedElementList(form);

  const validateOfferTitle = (value) => value.length >= TITLE_MIN && value.length <= TITLE_MAX;

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
      return `Для количества комнат ${capacityByRoom.roomValue} указано неверное количество гостей \n Допустимое значение "${capacityByRoom.description}"  \n Измените количество комнат или количество гостей`;
    } else {
      return `Для количества комнат ${capacityByRoom.roomValue} указано неверное количество гостей \n Допустимое число гостей от "${capacityByRoom.MIN}" до "${capacityByRoom.MAX}" \n Измените количество комнат или количество гостей`;
    }
  };

  // валидаторы
  offerPristineValidation.addValidator(checkedElementList.title, validateOfferTitle, TITLE_OUT_OF_RANGE);
  offerPristineValidation.addValidator(checkedElementList.price, validateOfferPrice, getPlaceOutOfRangeText);
  offerPristineValidation.addValidator(checkedElementList.capacity, validateOfferCapacity, getCapacityErrorText);
  offerPristineValidation.addValidator(checkedElementList.room, validateOfferCapacity, getCapacityErrorText);

  // листинер для валидации
  const validateListener = (evt) => {
    if (!offerPristineValidation.validate()) {
      evt.preventDefault();
    }
  };

  form.addEventListener('submit', validateListener);
};

export { offerValidation, createOfferPristineObject};
