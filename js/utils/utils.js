const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const getRandomInteger = (min, max) => {
  if (Number.isInteger(min) && Number.isInteger(max) && min >= 0 && max >= 0) {
    if (min > max) { [min, max] = [max, min]; }
    return Math.floor(min + Math.random() * (max - min + 1));
  }
  throw new RangeError('Incoming data error. Check incoming data');
};

// случайный неуникальный массив на основе исходного
const getNonUnicRangomArray = (srcArray, newLength) => {
  const newArray = new Array(newLength).fill(null).map(() => srcArray[getRandomInteger(0, srcArray.length - 1)]);
  return newArray;
};

const formatAddressByLocation = ({ lat, lng }, precision) => `${lat.toFixed(precision)}, ${lng.toFixed(precision)}`;

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export { getNonUnicRangomArray, formatAddressByLocation, isEscKey, debounce };
