import {getRandomFloat, getRandomInteger, getUnicRangomArray, getNonUnicRangomArray, getUnicArrayValue} from './utils.js';
import { getOfferTitle, getOfferPlace, getCheckinTime, getCheckoutTime, getFeatures, getDescriptions, getPhotos } from '../config.js';

const TEST_OBJECT_NUM = 10;
const TEST_PRICE_MIN = 1000000;
const TEST_PRICE_MAX = 1000000;
const TEST_ROOM_MIN = 0;
const TEST_ROOM_MAX = 100;
const TEST_GUEST_MIN = 0;
const TEST_GUEST_MAX = 3;
const TEST_LAT_MIN = 35.65000;
const TEST_LAT_MAX = 35.70000;
const TEST_LAT_PRECISION = 5;
const TEST_LNG_MIN = 139.70000;
const TEST_LNG_MAX = 139.80000;
const TEST_LNG_PRECISION = 5;

const getAvatarLink = (index) => {
  let avatarLink = '';
  if (index < 9) {
    avatarLink = `img/avatars/user0${index + 1}.png`;
  } else { avatarLink = `img/avatars/user${index + 1}.png`; }
  return avatarLink;
};

const createAvatarArray = (arrayLength) => {
  const avatarSrcArray = new Array(arrayLength).fill(null).map((_, index) => getAvatarLink(index));
  return avatarSrcArray;
};

const createOfferList = (itemQuantity) => {
  const getRandomAvatarLink = getUnicArrayValue(createAvatarArray(itemQuantity));

  const createOfferItem = () => {

    const offerObject = {
      author: { avatar: getRandomAvatarLink(), },
      offer: {
        title: getOfferTitle()[getRandomInteger(0, getOfferTitle().length - 1)],
        address: '',
        price: getRandomInteger(TEST_PRICE_MIN, TEST_PRICE_MAX),
        type: getOfferPlace()[getRandomInteger(0, getOfferPlace().length - 1)].kind,
        rooms: getRandomInteger(TEST_ROOM_MIN, TEST_ROOM_MAX),
        guests: getRandomInteger(TEST_GUEST_MIN, TEST_GUEST_MAX),
        checkin: getCheckinTime()[getRandomInteger(0, getCheckinTime().length - 1)],
        checkout: getCheckoutTime()[getRandomInteger(0, getCheckoutTime().length - 1)],
        features: getUnicRangomArray(getFeatures()),
        description: getDescriptions()[getRandomInteger(0, getDescriptions().length - 1)],
        photos: getNonUnicRangomArray(getPhotos(), getRandomInteger(1, 5)) ,
        location: {
          lat: getRandomFloat(TEST_LAT_MIN, TEST_LAT_MAX, TEST_LAT_PRECISION),
          lng: getRandomFloat(TEST_LNG_MIN, TEST_LNG_MAX, TEST_LNG_PRECISION),
        },
      }
    };
    offerObject.offer.address = `${offerObject.offer.location.lat} ${offerObject.offer.location.lng}`;
    // offerObject.author.avatar = getAvatarLink(index);
    // offerObject.author.avatar =getRandomAvatarLink();

    return offerObject;
  };

  const offerArray = new Array(itemQuantity).fill(null).map(() => createOfferItem());
  // console.log(offerArray);
  return offerArray;
};

const prepareTestData = () => createOfferList(TEST_OBJECT_NUM);

// console.log(prepareTestData());

export { createOfferList, prepareTestData };

// console.log(createOfferItem());
// console.log(createOfferList(TEST_OBJECT_NUM));


