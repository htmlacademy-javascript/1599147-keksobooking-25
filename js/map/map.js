import { getMapInitCenter, getMapInitScale, getMapLayer, getMapAttribution, getMapMainIcon, getMapIcon, getMapMaxPin } from './map-config.js';
import { setOfferAddress } from '../form/form.js';
import { fillCardData } from './map-popup.js';

const mapCenterPoint = getMapInitCenter();
const mainMarkerIcon = L.icon(getMapMainIcon());
const markerIcon = L.icon(getMapIcon());
const MAX_VISIBLE_MARKER = getMapMaxPin();

const mapInit = (mapId, onLoadCallback) => L.map(mapId, { tap: false })
  .on('load', onLoadCallback)
  .setView(mapCenterPoint, getMapInitScale());

const mapAddLayer = (map) => {
  L.tileLayer(getMapLayer(),
    {
      attribution: getMapAttribution(),
    },
  ).addTo(map);
};

const createLayerGroup = (map) => L.layerGroup().addTo(map);

const createMarker = (location, icon, draggable=false) => L.marker(location,
  {
    draggable: draggable,
    icon: icon,
  },
);

const mainMarker = createMarker(mapCenterPoint, mainMarkerIcon, true);

// инициализация маркера на карте
const mapInitMainMarker = (map, form) => {
  mainMarker.addTo(map);
  const setAddress = setOfferAddress(form);
  setAddress(mapCenterPoint);
  mainMarker.on('moveend', (evt) => { setAddress(evt.target.getLatLng()); });
};

const resetMarker = (marker, location) => { marker.setLatLng(location); };

const resetMainMarker = (form) => {
  // const markerPoint = getMapInitCenter();
  resetMarker(mainMarker, mapCenterPoint);
  setOfferAddress(form)(mapCenterPoint);
};

const mapSetOfferMarker = (map, template, layer) => (offerItem) => {
  const { lat, lng, } = offerItem.location;
  const offerMarker = createMarker({
    lat,
    lng,
  }, markerIcon);
  offerMarker.addTo(layer).bindPopup(fillCardData(template, offerItem));
};

const mapInitOfferMarkers = (map, template, layer) => {
  const initMarkerItem = mapSetOfferMarker(map, template, layer);
  return (offers) => offers.slice(0, MAX_VISIBLE_MARKER).forEach((element) => { initMarkerItem(element); });
};

const createRemoveMarkerPopUp = (mapArea) => () => {
  const popup = mapArea.querySelector('.leaflet-popup');
  if (popup) { popup.remove(); }
};


export { mapInit, mapAddLayer, mapInitMainMarker, mapInitOfferMarkers, resetMainMarker, createRemoveMarkerPopUp, createLayerGroup };
