// вспомогательная функция  - проверяет входные данные
const prepareData = (prepareType, firstValue, secondValue) => {
  firstValue = + firstValue;
  secondValue = + secondValue;

  if ( prepareType === 'int' && (!Number.isInteger(firstValue) || !Number.isInteger(secondValue) || firstValue < 0 || secondValue <0)) {
    return NaN;
  }

  if (prepareType === 'float' && (!(typeof firstValue === 'number') || !(typeof secondValue === 'number') || firstValue < 0 || secondValue < 0)) {
    return NaN;
  }

  if (firstValue > secondValue) { [firstValue, secondValue] = [secondValue, firstValue]; }
  return [firstValue, secondValue];
};

// случайное целое
const getRandomInteger = (min, max) => {
  const checkedData = prepareData('int', min, max);
  if (Number.isNaN(checkedData)) { return NaN; }
  [min, max] = checkedData;
  return Math.floor(min + Math.random() * (max - min + 1));
};

// случайное дробное
const getRandomFloat = (min, max, exp = 0) => {
  const checkedData = prepareData('float', min, max);
  exp = +exp;
  if (Number.isNaN(checkedData) || exp < 0 || !Number.isInteger(exp)) { return NaN; }
  [min, max] = checkedData;
  const multiplieRate = Math.pow(10, exp);
  min = Math.ceil(min *= multiplieRate);
  max = Math.floor(max *= multiplieRate);
  min = (min > max) ? min = max: min ;
  const result = ((min + Math.random() * (max - min)) / multiplieRate).toFixed(exp);
  return result;
};

getRandomInteger(4, 0);
getRandomFloat(10.123156, '10.1286789', 10);


