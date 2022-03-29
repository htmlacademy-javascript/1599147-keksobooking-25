const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const getRandomInteger = (min, max) => {
  if (Number.isInteger(min) && Number.isInteger(max) && min >= 0 && max >= 0) {
    if (min > max) { [min, max] = [max, min]; }
    return Math.floor(min + Math.random() * (max - min + 1));
  }
  throw new RangeError('Incoming data error. Check incoming data');
};

// случайное дробное
// const getRandomFloat = (min, max, exp = 0) => {
//   // проверяем, что на входе неотрицательные числа и кол-во знаков задано целым положительным числом
//   if ((typeof min === 'number') && (typeof max === 'number') && min >= 0 && max >= 0 && Number.isInteger(exp) && exp >= 0) {
//     // а далее в общем  то же самое - прощаем перепутанный диапазон и получаем рандом из диапазона
//     if (min > max) { [min, max] = [max, min]; }
//     return (min + Math.random() * (max - min)).toFixed(exp);
//   }
//   throw new RangeError('Incoming data error. Check incoming data');
// };

// случайный уникальный массив на основе исходного
// const getUnicRangomArray = (srcArray) => {
//   const newArray = new Array(getRandomInteger(0, srcArray.length - 1));
//   const copyOfSrcArray = srcArray.slice();

//   for (let i = 0; i < newArray.length; i++) {
//     let j = getRandomInteger(0, srcArray.length - 1);
//     while (copyOfSrcArray[j] === null) {
//       j = getRandomInteger(0, copyOfSrcArray.length - 1);
//     }
//     newArray[i] = copyOfSrcArray[j];
//     copyOfSrcArray[j] = null;
//   }

//   return newArray;
// };

// случайный неуникальный массив на основе исходного
const getNonUnicRangomArray = (srcArray, newLength) => {
  const newArray = new Array(newLength).fill(null).map(() => srcArray[getRandomInteger(0, srcArray.length - 1)]);
  return newArray;
};


// уникальное значение из массива
// есть массив. нужно случайным образом вытащить из него элементы, пока массив не "опустеет"
// реализация через замыкание -  на вход подается массив, на выходе - функция, которая "потрошит" массив и связана со входящим массивом
// const getUnicArrayValue = (array) => {
//   // console.log('create arch');
//   const tempArray = array.slice();
//   return () => {
//     let tempIndex = getRandomInteger(0, tempArray.length - 1);
//     let unicValue = tempArray[tempIndex];
//     if (tempArray.every((value) => value === null)) {
//       throw new Error('Array is empty');
//       // требований заказчика нет поскольку функция "временная" и для внутреннего пользования -  я выбрал этот вариант - он мне удобен
//       // если нужно скрыть вылеты - можно возвращать пустое значение.
//     }

//     //  далее "потрошим" массив
//     // в принципе можно попробовать очистку через splice до нулевой длины
//     while (!unicValue) {
//       tempIndex = getRandomInteger(0, tempArray.length -1 );
//       unicValue = tempArray[tempIndex];
//     }
//     tempArray[tempIndex] = null;
//     // console.log(tempArray);
//     return unicValue;
//   };
// };


// та же самая идея с замыканием, но с использованием splice - сразу чистим массив, всегда попадаем на корректное значение, не нужен перебор while
// const getUnicArrayValue = (array) => {
//   const tempArray = array.slice();

//   return () => {
//     let unicValue = '';
//     let tempIndex;
//     if (!tempArray.length) {
//       return unicValue;
//     } else {
//       tempIndex = getRandomInteger(0, tempArray.length - 1);
//       unicValue = tempArray[tempIndex];
//     }
//     tempArray.splice(tempIndex, 1);
//     return unicValue;
//   };
// };

const formatAddressByLocation = ({
  lat,
  lng
}, precision) => `${lat.toFixed(precision)}, ${lng.toFixed(precision)}`;

export { getNonUnicRangomArray, formatAddressByLocation, isEscKey };
// export { getRandomFloat, getRandomInteger, getUnicRangomArray, getNonUnicRangomArray, getUnicArrayValue, formatAddressByLocation, isEscKey };
