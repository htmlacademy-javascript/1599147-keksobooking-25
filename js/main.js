// text
import {getRandomFloat, getRandomInteger, getUnicRangomArray, getNonUnicRangomArray} from './utils.js';
import { getOfferTitle, getOfferPlace, getCheckinTime, getCheckoutTime, getFeatures, getDescriptions, getPhotos } from './config.js';

import './map/map-config.js'; // конфигурация  для карты
import './map/map.js'; //згрузка и инициализация карты
import './map/map-filter.js'; // работа с фильтром карты
import './map/map-popup.js'; // всплывающая карточка на карте
import './form/check-form.js'; // проверка полей формы
import './form/form.js'; // работа с формой
import './alert-popup.js'; // попапы для ошибок
import './server.js'; // взаимодействие с сервером

const TEST_OBJECT_NUM = 10;

const createOfferItem = (index) => {

  const offerObject = {
    author: { avatar: '', },
    offer: {
      title: getOfferTitle()[getRandomInteger(0, getOfferTitle().length - 1)],
      address: '',
      price: getRandomInteger(0, 1000000),
      type: getOfferPlace()[getRandomInteger(0, getOfferPlace().length - 1)].kind,
      rooms: getRandomInteger(0, 100),
      guests: getRandomInteger(0, 3),
      checkin: getCheckinTime()[getRandomInteger(0, getCheckinTime().length - 1)],
      checkout: getCheckoutTime()[getRandomInteger(0, getCheckoutTime().length - 1)],
      features: getUnicRangomArray(getFeatures()),
      description: getDescriptions()[getRandomInteger(0, getDescriptions().length - 1)],
      photos: getNonUnicRangomArray(getPhotos(), getRandomInteger(1, 5)) ,
      location: {
        lat: getRandomFloat(35.65000, 35.70000, 5),
        lng: getRandomFloat(139.70000, 139.80000, 5),
      },
    }
  };
  offerObject.address = `${offerObject.offer.location.lat} ${offerObject.offer.location.lng}`;

  if (index < 8) {
    offerObject.author.avatar = `img/avatars/user0${index + 1}.png`;
  }

  return offerObject;
};

const createOfferList = (itemQuantity) => {

  const offerArray = new Array(itemQuantity).fill(null).map((value, index) => createOfferItem(index));
  return offerArray;
};

// console.log(createOfferItem());
// console.log(createOfferList(TEST_OBJECT_NUM));

createOfferList(TEST_OBJECT_NUM);
