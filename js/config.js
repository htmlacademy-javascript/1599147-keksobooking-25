// константы и служебные массивы
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

const roomsCapacity = [
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

const CHECK_IN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECK_OUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const placeFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const placesMap = new Map();
places.forEach((value) => { placesMap.set(value.kind, value); });

const roomsCapacityMap = new Map();
roomsCapacity.forEach((value) => {roomsCapacityMap.set(value.roomValue, value);});

const getOfferPlaces = () => placesMap;
const getRoomsCapacity = () => roomsCapacityMap;
const getCheckinTime = () => CHECK_IN_TIME;
const getCheckoutTime = () => CHECK_OUT_TIME;
const getFeatures = () => placeFeatures;
const getGlobalMinPrice = () => GLOBAL_MIN_PRICE;
const getGlobalMaxPrice = () => GLOBAL_MAX_PRICE;
const getServerURL = () => API_URL;
const getMaxMapOffer = () => MAX_MAP_OFFER;

export { getCheckinTime, getCheckoutTime, getFeatures, getOfferPlaces, getRoomsCapacity, getGlobalMinPrice, getGlobalMaxPrice, getServerURL, getMaxMapOffer };
