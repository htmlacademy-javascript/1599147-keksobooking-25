import { getMapInitCenter, getMapInitScale, getMapLayer, getMapAttribution, getMapMainIcon, getMapIcon, getMapMaxPin } from './map-config.js';
import { setOfferAddress } from '../form/form.js';
import { fillCardData } from './map-popup.js';
import { getNonUnicRangomArray } from '../utils/utils.js';

const mainMarkerIcon = L.icon(getMapMainIcon());
const markerIcon = L.icon(getMapIcon());
const MAX_VISIBLE_MARKER = getMapMaxPin();

const mapInit = (mapId, onLoadCallback) => L.map(mapId, { tap: false })
  .on('load', onLoadCallback)
  .setView(getMapInitCenter(), getMapInitScale());

const mapAddLayer = (map) => {
  L.tileLayer(getMapLayer(),
    {
      attribution: getMapAttribution(),
    },
  ).addTo(map);
};

const createMarker = (location, icon, draggable=false) => L.marker(location,
  {
    draggable: draggable,
    icon: icon,
  },
);

const mainMarker = createMarker(getMapInitCenter(), mainMarkerIcon, true);

// инициализация маркера на карте
const mapInitMainMarker = (map, form) => {
  mainMarker.addTo(map);
  const setAddress = setOfferAddress(form);
  setAddress(getMapInitCenter());
  mainMarker.on('moveend', (evt) => { setAddress(evt.target.getLatLng()); });
};

const resetMarker = (marker, location) => { marker.setLatLng(location); };

const resetMainMarker = (form) => {
  resetMarker(mainMarker, getMapInitCenter());
  // console.log('reset marker');
  // const setAddress = ;
  setOfferAddress(form)(getMapInitCenter());
  // console.log('reset Address');
};

const mapSetOfferMarker = (map, template) => (offerItem) => {
  const { lat, lng, } = offerItem.location;
  const offerMarker = createMarker({
    lat,
    lng,
  }, markerIcon);
  offerMarker.addTo(map).bindPopup(fillCardData(template, offerItem));
};

const mapInitOfferMarkers = (map, template) => {
  const initMarkerItem = mapSetOfferMarker(map, template);
  return  (offers) => getNonUnicRangomArray(offers, MAX_VISIBLE_MARKER).forEach((element) => { initMarkerItem(element);});
};

export { mapInit, mapAddLayer, mapInitMainMarker, mapInitOfferMarkers, resetMainMarker };
