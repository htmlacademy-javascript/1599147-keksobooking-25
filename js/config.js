const API_URL = 'https://23.javascript.pages.academy/keksobooking';

const MAX_MAP_OFFER = 10;

const GLOBAL_MIN_PRICE = 0;
const GLOBAL_MAX_PRICE = 100000;

const places = [
  {
    kind: 'bungalow',
    nameRu: 'Бунгало',
    minPrice: 0,
    maxPrice: GLOBAL_MAX_PRICE,
  },
  {
    kind: 'flat',
    nameRu:'Квартира',
    minPrice: 1000,
    maxPrice: GLOBAL_MAX_PRICE,
  },
  {
    kind: 'house',
    nameRu:'Дом',
    minPrice: 5000,
    maxPrice: GLOBAL_MAX_PRICE,
  },
  {
    kind: 'hotel',
    nameRu: 'Отель',
    minPrice: 3000,
    maxPrice: GLOBAL_MAX_PRICE,
  },
  {
    kind: 'palace',
    nameRu:'Дворец',
    minPrice: 10000,
    maxPrice: GLOBAL_MAX_PRICE,
  },
];

const roomsCapacities = [
  { roomValue: '1',
    MIN: 1,
    MAX: 1,
    description: '',
  },
  { roomValue: '2',
    MIN: 1,
    MAX: 2,
    description: '',
  },
  { roomValue: '3',
    MIN: 1,
    MAX: 3,
    description: '',
  },
  { roomValue: '100',
    MIN: 0,
    MAX: 0,
    description: 'не для гостей',
  },
];

const CHECK_IN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECK_OUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

// const placeFeatures = [
//   'wifi',
//   'dishwasher',
//   'parking',
//   'washer',
//   'elevator',
//   'conditioner',
// ];

const PRICE_FILTER_LIMITS = {
  low: {
    MAX: 10000,
  },
  middle: {
    MIN: 10000,
    MAX: 50000,
  },
  high: {
    MIN: 50000,
  },
};

const DEFAULT_FILTER_VALUE = 'any';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const AVATAR_SRC = 'img/muffin-grey.svg';

const offerPreviewSettings = {
  width: '70',
  height: '70',
  alt: 'Фотография жилья',
};

const placesMap = new Map();
places.forEach((value) => { placesMap.set(value.kind, value); });

const roomsCapacityMap = new Map();
roomsCapacities.forEach((value) => {roomsCapacityMap.set(value.roomValue, value);});

const getOfferPlaces = () => placesMap;
const getRoomsCapacity = () => roomsCapacityMap;
const getCheckinTime = () => CHECK_IN_TIMES;
const getCheckoutTime = () => CHECK_OUT_TIMES;
// const getFeatures = () => placeFeatures;
const getGlobalMinPrice = () => GLOBAL_MIN_PRICE;
const getGlobalMaxPrice = () => GLOBAL_MAX_PRICE;
const getServerURL = () => API_URL;
const getMaxMapOffer = () => MAX_MAP_OFFER;
const getPriceFilterLimit = () => PRICE_FILTER_LIMITS;
const getDefaultFilterValue = () => DEFAULT_FILTER_VALUE;
const getUploadFilesType = () => FILE_TYPES;
const getAvatarSrc = () => AVATAR_SRC;
const getOfferPreviewSettings = () => offerPreviewSettings;

// getFeatures
export { getCheckinTime, getCheckoutTime, getOfferPlaces, getRoomsCapacity, getGlobalMinPrice, getGlobalMaxPrice, getServerURL, getMaxMapOffer, getPriceFilterLimit, getDefaultFilterValue, getUploadFilesType, getAvatarSrc, getOfferPreviewSettings };
