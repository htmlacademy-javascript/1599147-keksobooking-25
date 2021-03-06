import { getOfferPlaces, getRoomsCapacity } from '../config.js';
import { getOfferFormElements } from './form-config.js';

const roomsCapacity = getRoomsCapacity();
const offerPlaces = getOfferPlaces();

const createOfferPristineObject = (offerForm) => new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--error',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error-text',
});

const offerValidation = (form, offerPristineValidation) => {

  const checkedElementList = getOfferFormElements(form);

  const validateOfferPrice = () => {
    const placeByKind = offerPlaces.get(checkedElementList.type.value);
    return checkedElementList.price.value >= placeByKind.minPrice && checkedElementList.price.value <= placeByKind.maxPrice;
  };

  const validateOfferCapacity = () => {
    const capacityByRoom = roomsCapacity.get(checkedElementList.room.value);
    return checkedElementList.capacity.value >= capacityByRoom.MIN && checkedElementList.capacity.value <= capacityByRoom.MAX;
  };

  const getPlaceOutOfRangeText = () => {
    const placeByKind = offerPlaces.get(checkedElementList.type.value);
    return `Цена за ночь не менее ${placeByKind.minPrice} и не более ${placeByKind.maxPrice}`;
  };

  const getCapacityErrorText = () => {
    const capacityByRoom = roomsCapacity.get(checkedElementList.room.value);

    if (capacityByRoom.MAX === 0 ) {
      return `Для количества комнат ${capacityByRoom.roomValue} допустимое значение гостей: "${capacityByRoom.description}"  \n Измените количество комнат или количество гостей`;
    } else {
      return `Для ${capacityByRoom.roomValue} комнат(ы) можно указать от "${capacityByRoom.MIN}" до "${capacityByRoom.MAX}" гостей \n Измените количество комнат или количество гостей`;
    }
  };

  offerPristineValidation.addValidator(checkedElementList.price, validateOfferPrice, getPlaceOutOfRangeText);
  offerPristineValidation.addValidator(checkedElementList.capacity, validateOfferCapacity, getCapacityErrorText);
  offerPristineValidation.addValidator(checkedElementList.room, validateOfferCapacity);

};

export { offerValidation, createOfferPristineObject};
