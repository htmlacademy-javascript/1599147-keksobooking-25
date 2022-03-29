const MAP_ID = 'map-canvas';

const MAP_INIT_CENTER = {
  lat: 35.67500,
  lng: 139.75000,
};

const MAP_INIT_SCALE = 13;

const MAP_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAP_MAIN_ICON = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const MAP_ICON = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const MAP_MAX_OFFER_PIN = 10;

const getMapId = () => MAP_ID;
const getMapInitCenter = () => MAP_INIT_CENTER;
const getMapInitScale = () => MAP_INIT_SCALE;
const getMapLayer = () => MAP_LAYER;
const getMapAttribution = () => MAP_ATTRIBUTION;
const getMapMainIcon = () => MAP_MAIN_ICON;
const getMapIcon = () => MAP_ICON;
const getMapMaxPin = () => MAP_MAX_OFFER_PIN;

export { getMapId, getMapInitCenter, getMapInitScale, getMapLayer, getMapAttribution, getMapMainIcon, getMapIcon, getMapMaxPin };
