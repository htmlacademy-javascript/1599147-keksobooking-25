import {getRandomFloat, getRandomInteger, getUnicRangomArray, getNonUnicRangomArray} from './utils.js';
import { getOfferTitle, getOfferPlace, getCheckinTime, getCheckoutTime, getFeatures, getDescriptions, getPhotos } from '../config.js';

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
  offerObject.offer.address = `${offerObject.offer.location.lat} ${offerObject.offer.location.lng}`;
  // перевести на замыкание - набор уникальных индексов от 1 до 9
  if (index < 8) {
    offerObject.author.avatar = `img/avatars/user0${index + 1}.png`;
  }

  return offerObject;
};

const createOfferList = (itemQuantity) => {
  const offerArray = new Array(itemQuantity).fill(null).map((value, index) => createOfferItem(index));
  return offerArray;
};

const prepareTestData = () => {
  const TEST_OBJECT_NUM = 10;
  return createOfferList(TEST_OBJECT_NUM);
};

export { createOfferList, prepareTestData };

// console.log(createOfferItem());
// console.log(createOfferList(TEST_OBJECT_NUM));


