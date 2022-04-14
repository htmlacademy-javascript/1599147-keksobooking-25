const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const formatAddressByLocation = ({ lat, lng }, precision) => `${lat.toFixed(precision)}, ${lng.toFixed(precision)}`;

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { formatAddressByLocation, isEscKey, debounce };
