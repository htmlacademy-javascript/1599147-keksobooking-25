//создание карточки для показа объявлений
import { getOfferPlace } from '../config.js';
import { getPriceSuffix, getRoomText, getGuestText, getGuestLimit } from './map-popup-config.js';

const offerPlaceList = getOfferPlace();
const roomText = getRoomText();
const guestText = getGuestText();
const guestLimit = getGuestLimit();

const getPlaceName = (placeList, placeKind) => {
  const place = placeList.find((value) => value.kind === placeKind);
  return place.nameRu;
};

const roomFixTextConfig = {
  0: (roomQuantity) => `${roomQuantity} ${roomText.UNKNOWN_ROOM_TEXT}`,
  11: (roomQuantity) => `${roomQuantity} ${roomText.MORE_ROOM_TEXT}`,
  12: (roomQuantity) => `${roomQuantity} ${roomText.MORE_ROOM_TEXT}`,
  13: (roomQuantity) => `${roomQuantity} ${roomText.MORE_ROOM_TEXT}`,
};

const roomAnyTextConfig = {
  1: (roomQuantity) => `${roomQuantity} ${roomText.ONE_ROOM_TEXT}`,
  2: (roomQuantity) => `${roomQuantity} ${roomText.PLURAL_ROOM_TEXT}`,
  3: (roomQuantity) => `${roomQuantity} ${roomText.PLURAL_ROOM_TEXT}`,
  4: (roomQuantity) => `${roomQuantity} ${roomText.PLURAL_ROOM_TEXT}`,
};

const getRoomDescription = (roomQuantity) => {
  const fixFormatter = roomFixTextConfig[roomQuantity];
  const anyFormatter = roomAnyTextConfig[roomQuantity % 10];
  if (fixFormatter) {
    return fixFormatter(roomQuantity);
  }
  if (anyFormatter) {
    return anyFormatter(roomQuantity);
  }
  return `${roomQuantity} ${getRoomText().MORE_ROOM_TEXT}`;
};

const getGuestDescription = (guestQuantity) => {
  if (guestQuantity === guestLimit.NUM_GUESTS_UNKNOWN || guestQuantity >= guestLimit.NUM_GUESTS_MAX_LIMIT) {
    return ` ${guestText.TOO_MUCH_GUEST_TEXT}`;
  }
  if (guestQuantity % 10 === 1) {
    return ` для ${guestQuantity} ${guestText.ONE_GUEST_TEXT}`;
  }
  return ` для ${guestQuantity} ${guestText.PLURAL_GUEST_TEXT}`;
};

const createCardAvatar = (element, dataObject) => {
  if (dataObject.author && dataObject.author.avatar) {
    element.setAttribute('src', dataObject.author.avatar);
  } else { element.remove(); }
};

const createCardTitle = (element, dataObject) => {
  if (dataObject.offer && dataObject.offer.title) {
    element.textContent = dataObject.offer.title;
  } else {
    element.textContent = 'Заголовок предложения';
    element.classList.add('visually-hidden');
  }
};

const createCardAddress = (element, dataObject) => {
  if (dataObject.offer && dataObject.offer.address) {
    element.textContent = dataObject.offer.address;
  } else { element.remove(); }
};

const createCardPrice = (element, dataObject) => {
  if (dataObject.offer && dataObject.offer.price) {
    element.textContent = dataObject.offer.price;
    element.insertAdjacentHTML('beforeend', ` ${getPriceSuffix()}`);
  } else { element.remove(); }
};

const createCardType = (element, dataObject) => {
  if (dataObject.offer && dataObject.offer.type) {
    element.textContent = getPlaceName(offerPlaceList, dataObject.offer.type);
  } else {
    element.textContent = 'Тип жилья не указан';
    element.classList.add('visually-hidden');
  }
};

const createCapacityDescription = (element, dataObject) => {
  let guestsDescription = guestText.UNKNOWN_GUEST_TEXT;
  if (dataObject.offer.guests) {
    guestsDescription = getGuestDescription(dataObject.offer.guests);
  }
  let roomDescription = getRoomText().UNKNOWN_ROOM_TEXT;
  if (dataObject.offer.rooms) {
    roomDescription = getRoomDescription(dataObject.offer.rooms);
  }
  element.textContent = `${roomDescription} ${guestsDescription}`;
};

const createCardCapacity = (element, dataObject) => {
  if (!dataObject.offer || (!dataObject.offer.rooms && !dataObject.offer.guests)) {
    element.remove();
  } else {
    createCapacityDescription(element, dataObject);
  }
};

const createCardCheckTime = (element, dataObject) => {
  let checkinDescription = 'Время заезда не указано, ';
  let checkoutDescription = 'время выезда не указано';

  if (dataObject.offer && dataObject.offer.checkin) {
    checkinDescription = `Заезд после ${dataObject.offer.checkin}, `;
  }

  if (dataObject.offer && dataObject.offer.checkout) {
    checkoutDescription = `выезд до ${dataObject.offer.checkout}, `;
  }
  element.textContent = `${checkinDescription} ${checkoutDescription}`;
};

const createCardFeatures = (element, dataObject) => {
  if (dataObject.offer && dataObject.offer.features) {
    const featureList = dataObject.offer.features;
    const featuresTemplateItems = element.querySelectorAll('.popup__feature');
    const featureModifierList = featureList.map((feature) => `popup__feature--${feature}`);

    featuresTemplateItems.forEach((featureItem) => {
      const itemModifier = featureItem.classList[1];
      if (!featureModifierList.includes(itemModifier)) {
        featureItem.remove();
      }
    });
  } else { element.remove(); }
};

const createCardDescription = (element, dataObject) => {
  if (dataObject.offer && dataObject.offer.description) {
    element.textContent = dataObject.offer.description;
  } else { element.remove(); }
};

const createCardPhoto = (element, dataObject) => {
  const photoTemplates = element.querySelector('.popup__photo');
  photoTemplates.remove();

  if (dataObject.offer && dataObject.offer.photos) {
    dataObject.offer.photos.forEach((photoItem) => {
      const photoElement = photoTemplates.cloneNode(true);
      photoElement.setAttribute('src', photoItem);
      element.appendChild(photoElement);
    });
  }
};

const cardCreateSettings = [
  ['.popup__avatar', createCardAvatar],
  ['.popup__title', createCardTitle],
  ['.popup__text--address', createCardAddress],
  ['.popup__text--price', createCardPrice],
  ['.popup__type', createCardType],
  ['.popup__text--capacity', createCardCapacity],
  ['.popup__text--time', createCardCheckTime],
  ['.popup__features', createCardFeatures],
  ['.popup__description', createCardDescription],
  ['.popup__photos', createCardPhoto],
];

const fillCardData = (cardTemplateNode, dataItem) => {
  const cardItem = cardTemplateNode.cloneNode(true);
  cardCreateSettings.forEach(([element, callback]) => callback(cardItem.querySelector(element), dataItem));
  return cardItem;
};

const getTestCardFragment = (cardTemplate, testOfferList) => {
  const testCardListFragment = document.createDocumentFragment();
  testOfferList.forEach((offer) => {
    // console.log(offer);
    testCardListFragment.appendChild(fillCardData(cardTemplate, offer));
  });
  return testCardListFragment;
};

export { getTestCardFragment };

