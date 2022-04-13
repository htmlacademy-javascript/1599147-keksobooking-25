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
  avatarInput: form.querySelector('#avatar'),
  avatarPreviewImg: form.querySelector('.ad-form-header__preview img'),
  offerImgInput: form.querySelector('.ad-form__upload #images'),
  offerImgWrapper: form.querySelector('.ad-form__photo'),
});

const ADDRESS_PRECISION = 5;
const getAddressPrecision = () => ADDRESS_PRECISION;

export { getOfferFormElements, getAddressPrecision };
