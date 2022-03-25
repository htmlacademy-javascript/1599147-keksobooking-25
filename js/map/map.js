import { getMapInitCenter, getMapInitScale, getMapLayer, getMapAttribution, getMapMainIcon, getMapIcon } from './map-config.js';
import { setOfferAddress } from '../form/form.js';
import { fillCardData } from './map-popup.js';

const mainMarkerIcon = L.icon(getMapMainIcon());
const markerIcon = L.icon(getMapIcon());

const mapInit = (mapId, onLoadCallback) => L.map(mapId, { tap: false })
  .on('load', onLoadCallback)
  .setView(getMapInitCenter(), getMapInitScale());

const mapAddLayer = (map) => {
  // console.log('add layer');
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

// const resetMarker = (marker, location) => { marker.setLatLang(location); };

// инициализация маркера на карте
const mapInitMainMarker = (map, form) => {
  mainMarker.addTo(map);
  const setAddress = setOfferAddress(form);
  setAddress(getMapInitCenter());
  mainMarker.on('moveend', (evt) => {setAddress(evt.target.getLatLng());});
};

const mapSetOfferMarker = (map, offerItem, template) => {
  // console.log(getMapInitCenter());
  // console.log(offerItem.offer.location);
  const { lat, lng, } = offerItem.offer.location;
  const offerMarker = createMarker({
    lat,
    lng,
  }, markerIcon);
  offerMarker.addTo(map).bindPopup(fillCardData(template, offerItem));
};

export { mapInit, mapAddLayer, mapInitMainMarker, mapSetOfferMarker };
