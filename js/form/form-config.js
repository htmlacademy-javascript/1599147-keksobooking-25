const getOfferFormElements = (form) => ({
  title: form.querySelector('#title'),
  address: form.querySelector('#address'),
  type: form.querySelector('#type'),
  price: form.querySelector('#price'),
  room: form.querySelector('#room_number'),
  capacity: form.querySelector('#capacity'),
  checkIn: form.querySelector('#timein'),
  checkOut: form.querySelector('#timeout'),
  priceSlider: form.querySelector('.ad-form__slider'),
});

const ADDRESS_PRECISION = 5;
const getAddressPrecision = () => ADDRESS_PRECISION;

export { getOfferFormElements, getAddressPrecision };
