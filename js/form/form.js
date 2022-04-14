import { getOfferPlaces, getUploadFilesType, getOfferPreviewSettings, getAvatarSrc } from '../config.js';
import { getOfferFormElements, getAddressPrecision  } from './form-config.js';
import { formatAddressByLocation, debounce } from '../utils/utils.js';
import { resetMainMarker } from '../map/map.js';
import { offerValidation, createOfferPristineObject } from './validate-form.js';
import { postData } from '../server.js';
import { createSliderObject, setSliderListeners } from '../slider/slider.js';
import { resetMapFilter } from '../map/map-filter.js';


const places = getOfferPlaces();
const fileTypes = getUploadFilesType();
const offerPreviewSetting = getOfferPreviewSettings();

const disableElement = (element) => element.setAttribute('disabled', '');
const enableElement  = (element)=>element.removeAttribute('disabled');

const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
  [...form.elements].forEach(disableElement);
};

const disableSlider = (form) =>  disableElement(getOfferFormElements(form).priceSlider);
const enableSlider = (form) =>  enableElement(getOfferFormElements(form).priceSlider);

const enableForm = (form) => {
  form.classList.remove('ad-form--disabled');
  [...form.elements].forEach(enableElement);
};

const createSyncElements = (srcElement, destElement) => () => {
  destElement.value = srcElement.value;
};

const createCapacityChange = (pristineObject, room, capacity) => () => {
  pristineObject.validate(room);
  pristineObject.validate(capacity);
};

const onCheckTimeChangeListener = (srcElement, destElement) => {
  srcElement.addEventListener('change', createSyncElements(srcElement, destElement));
};

const setOfferAddress = (offerForm) => (location) => {
  getOfferFormElements(offerForm).address.value = formatAddressByLocation(location, getAddressPrecision());
};

const setOfferValidation = (offerForm, offerPristineObject, formElementList) => {

  offerValidation(offerForm, offerPristineObject);

  const placeChangeHandler = (evt) => {
    formElementList.price.placeholder = places.get(evt.target.value).minPrice;
    formElementList.price.setAttribute('min', places.get(evt.target.value).minPrice);
    offerPristineObject.validate(formElementList.price);
  };

  const capacityChangeHandler = createCapacityChange(offerPristineObject, formElementList.room, formElementList.capacity);

  const onPlaceChangeListener = () => {
    formElementList.type.addEventListener('change', (evt) => placeChangeHandler(evt));
  };

  const onRoomChangeListener = () => {
    formElementList.room.addEventListener('change', capacityChangeHandler);
  };

  const onCapacityChangeListener = () => {
    formElementList.capacity.addEventListener('change', capacityChangeHandler);
  };

  onPlaceChangeListener(offerForm);
  onRoomChangeListener(formElementList.room, capacityChangeHandler);
  onCapacityChangeListener(formElementList.capacity, capacityChangeHandler);
  onCheckTimeChangeListener(formElementList.checkIn, formElementList.checkOut);
  onCheckTimeChangeListener(formElementList.checkOut, formElementList.checkIn);
};

const checkUploadFile = (file) => {
  const fileName = file.name.toLowerCase();
  return fileTypes.some((it) => fileName.endsWith(it)) ;
};

const avatarUploadListener = (inputTarget, previewTarget) => {
  inputTarget.addEventListener('change', () => {
    const inputFile = inputTarget.files[0];
    if (checkUploadFile(inputFile)) {
      previewTarget.src = URL.createObjectURL(inputFile);
    }
  });
};

const prepareImgElement = (previewSetting) => {
  const { width, height, alt } = previewSetting;
  const imageElement = document.createElement('img');
  imageElement.setAttribute('width', width);
  imageElement.setAttribute('height', height);
  imageElement.setAttribute('alt', alt);
  return imageElement;
};

const appendPreviewElement = (imgWrapper) => imgWrapper.appendChild(prepareImgElement(offerPreviewSetting));

const findOrCreateImageElement = (imgWrapper) => {
  const imageElement = imgWrapper.querySelector('img');
  return imageElement ? imageElement : appendPreviewElement(imgWrapper);
};

const previewUploadImage = (inputFile, imgWrapper) => {
  if (!checkUploadFile(inputFile)) {
    return null;
  }
  const image = findOrCreateImageElement(imgWrapper);
  image.src = URL.createObjectURL(inputFile);
};

const offerUploadListener = (inputTarget, imgWrapper) => {
  inputTarget.addEventListener('change', () => {
    const inputFiles = inputTarget.files;
    if (inputFiles === null || inputFiles.length === 0) {
      return null;
    }
    previewUploadImage(inputFiles[0], imgWrapper);
  });
};

const resetAvatar = (element) => element.setAttribute('src', getAvatarSrc());
const resetOfferImg = (element) => element.querySelectorAll('img').forEach((el) => { el.remove(); });

const prepareOfferForm = (offerForm, filterForm, successPopup, errorPopup) => {
  const offerPristineObject = createOfferPristineObject(offerForm);
  const formElementList = getOfferFormElements(offerForm);

  createSliderObject(formElementList.priceSlider, formElementList.price);
  setSliderListeners(formElementList.priceSlider, formElementList.price);

  setOfferValidation(offerForm, offerPristineObject, formElementList);


  avatarUploadListener(formElementList.avatarInput, formElementList.avatarPreviewImg);
  offerUploadListener(formElementList.offerImgInput, formElementList.offerImgWrapper);

  const resetForm = () => {
    formElementList.priceSlider.noUiSlider.reset();
    resetAvatar(formElementList.avatarPreviewImg);
    resetOfferImg(formElementList.offerImgWrapper);
    resetMainMarker(offerForm);
  };

  const delayedResetForm = debounce(resetForm);

  const successSendFormHandler = () => {
    successPopup();
    offerForm.reset();
    resetMapFilter(filterForm);
    delayedResetForm(offerForm);
  };

  const resetFormHandler = () => {
    offerForm.reset();
    delayedResetForm(offerForm);
  };

  const submitFormHandler = (evt) => {
    evt.preventDefault();
    const isFormValid = offerPristineObject.validate();
    if (isFormValid) {
      const formData = new FormData(evt.target);
      postData(successSendFormHandler, errorPopup, formData);
    }
  };

  offerForm.addEventListener('submit', submitFormHandler);
  offerForm.addEventListener('reset', resetFormHandler);
};

export { disableForm, enableForm, prepareOfferForm, setOfferAddress, disableSlider, enableSlider };
