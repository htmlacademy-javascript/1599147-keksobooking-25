// случайное целое
const getRandomInteger = (min, max) => {
  // на вход поlается целое неотрицательное число
  if (Number.isInteger(min) && Number.isInteger(max) && min >= 0 && max >= 0) {
    // если диапазон перепутали, я думаю, можно простить и самим переставить числа как надо
    if (min > max) { [min, max] = [max, min]; }
    return Math.floor(min + Math.random() * (max - min + 1));
  }
  // вот тут, думаю, принципиально - я пытался найти и чекнуть все особые ситуации, а надо было идти по принципу: принимаем правильные данные, а всё остальное - посылаем :)
  throw new RangeError('Incoming data error. Check incoming data');
};

// случайное дробное
const getRandomFloat = (min, max, exp = 0) => {
  // проверяем, что на входе неотрицательные числа и кол-во знаков задано целым положительным числом
  if ((typeof min === 'number') && (typeof max === 'number') && min >= 0 && max >= 0 && Number.isInteger(exp) && exp >= 0) {
    // а далее в общем  то же самое - прощаем перепутанный диапазон и получаем рандом из диапазона
    if (min > max) { [min, max] = [max, min]; }
    return (min + Math.random() * (max - min)).toFixed(exp);
  }
  throw new RangeError('Incoming data error. Check incoming data');
};

getRandomInteger(44, 10);
// console.log(getRandomInteger(20, 10));
getRandomFloat(10.123156, 10.4286789, 10);
// console.log(getRandomFloat(10.123156, 10.5286789, 10));


