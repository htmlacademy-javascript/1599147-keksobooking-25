//создание карточки для показа объявлений
import { prepareTestData } from '../utils/create-test-data.js';
import { getOfferPlace } from '../config.js';

const cardContent = document.querySelector('#card').content.querySelector('.popup');
// const testOfferList = prepareTestData();
const testCardListFragment = document.createDocumentFragment();
const mapTarget = document.querySelector('#map-canvas');


const offerPlaceList = getOfferPlace();
const PRICE_SUFFIX = '<span>₽/ночь</span>';
const ONE_ROOM_TEXT = 'комната';
const PLURAL_ROOM_TEXT = 'комнаты';
const MORE_ROOM_TEXT = 'комнат';
const UNKNOWN_ROOM_TEXT = 'Число комнат не указано';

const ONE_GUEST_TEXT = 'гостя';
const PLURAL_GUEST_TEXT = 'гостей';
const TOO_MUCH_GUEST_TEXT = 'не для гостей';
// const UNKNOWN_GUEST_TEXT = 'Число гостей не указано';
const NUM_GUESTS_UNKNOWN = 0;
const NUM_GUESTS_MAX_LIMIT = 100;

const getPlaceName = (placeList, placeKind) => {
  const place = placeList.find((value) => value.kind === placeKind);
  return place.nameRu;
};

const getRoomDescription = (roomQuantity) => {
  switch (roomQuantity) {
    case 0: return `${roomQuantity} ${UNKNOWN_ROOM_TEXT}`;
    case 11: return `${roomQuantity} ${MORE_ROOM_TEXT}`;
    case 12: return `${roomQuantity} ${MORE_ROOM_TEXT}`;
    case 13: return `${roomQuantity} ${MORE_ROOM_TEXT}`;
  }
  switch (roomQuantity % 10) {
    case 1: return `${roomQuantity} ${ONE_ROOM_TEXT}`;
    case 2: return `${roomQuantity} ${PLURAL_ROOM_TEXT}`;
    case 3: return `${roomQuantity} ${PLURAL_ROOM_TEXT}`;
    case 4: return `${roomQuantity} ${PLURAL_ROOM_TEXT}`;
    default: return `${roomQuantity} ${MORE_ROOM_TEXT}`;
  }
};

const getGuestDescription = (guestQuantity) => {
  if (guestQuantity === NUM_GUESTS_UNKNOWN || guestQuantity >= NUM_GUESTS_MAX_LIMIT) { return ` ${TOO_MUCH_GUEST_TEXT}`; }
  switch (guestQuantity % 10) {
    case 1: return ` для ${guestQuantity} ${ONE_GUEST_TEXT}`;
    default: return ` для ${guestQuantity} ${PLURAL_GUEST_TEXT}`;
  }
};

const fillCardData = (dataItem) => {
  const cardItem = cardContent.cloneNode(true);

  //  аватар
  if (dataItem.author.avatar) {
    cardItem.querySelector('.popup__avatar').setAttribute('src', dataItem.author.avatar);
  } else { cardItem.querySelector('.popup__avatar').remove(); }

  // заголовок
  if (dataItem.offer && dataItem.offer.title) {
    cardItem.querySelector('.popup__title').textContent = dataItem.offer.title;
  } else {
    cardItem.querySelector('.popup__title').textContent = 'Заголовок предложения';
    cardItem.querySelector('.popup__title').classList.add('visually-hidden');
  }

  // адрес
  if (dataItem.offer && dataItem.offer.address) {
    cardItem.querySelector('.popup__text--address').textContent = dataItem.offer.address;
  } else { cardItem.querySelector('.popup__text--address').remove(); }

  //цена
  if (dataItem.offer && dataItem.offer.price) {
    cardItem.querySelector('.popup__text--price').textContent = dataItem.offer.price;
    cardItem.querySelector('.popup__text--price').insertAdjacentHTML('beforeend', ` ${PRICE_SUFFIX}`);
  } else { cardItem.querySelector('.popup__text--price').remove(); }

  // тип
  if (dataItem.offer && dataItem.offer.type) {
    cardItem.querySelector('.popup__type').textContent = getPlaceName(offerPlaceList, dataItem.offer.type);
  } else {
    cardItem.querySelector('.popup__type').textContent = 'Тип жилья не указан';
    cardItem.querySelector('.popup__type').classList.add('visually-hidden');
  }

  if (!dataItem.offer || (!dataItem.offer.rooms && !dataItem.offer.guests)) {
    cardItem.querySelector('.popup__text--capacity').remove();
  } else {
    let roomDescription = UNKNOWN_ROOM_TEXT;
    if (dataItem.offer.rooms) {
      roomDescription = getRoomDescription(dataItem.offer.rooms);
    }
    const guestsDescription = getGuestDescription(dataItem.offer.guests);
    cardItem.querySelector('.popup__text--capacity').textContent = `${roomDescription} ${guestsDescription}`;
  }

  let checkinDescription = 'Время заезда не указано, ';
  let checkoutDescription = 'Время выезда не указано';

  if (dataItem.offer && dataItem.offer.checkin) {
    checkinDescription = `Заезд после ${dataItem.offer.checkin}, `;
  }

  if (dataItem.offer && dataItem.offer.checkout) {
    checkoutDescription = `выезд до ${dataItem.offer.checkout}, `;
  }

  cardItem.querySelector('.popup__text--time').textContent = `${checkinDescription} ${checkoutDescription}`;

  if (dataItem.offer && dataItem.offer.features){
    const featureList = dataItem.offer.features;
    const featuresTemplateItems = cardItem.querySelectorAll('.popup__feature');
    const featureModifierList = featureList.map((feature) => `popup__feature--${feature}`);

    featuresTemplateItems.forEach((featureItem) => {
      const itemModifier = featureItem.classList[1];
      if (!featureModifierList.includes(itemModifier)) {
        featureItem.remove();
      }
    });
  } else { cardItem.querySelector('.popup__features').remove(); }

  if (dataItem.offer && dataItem.offer.description) {
    cardItem.querySelector('.popup__description').textContent = dataItem.offer.description;
  }

  const photoWrapper = cardItem.querySelector('.popup__photos');
  const photoTemplates = photoWrapper.querySelector('.popup__photo');
  photoTemplates.remove();

  if (dataItem.offer && dataItem.offer.photos) {
    dataItem.offer.photos.forEach((photoItem) => {
      const photoElement = photoTemplates.cloneNode(true);
      photoElement.setAttribute('src', photoItem);
      photoWrapper.appendChild(photoElement);
    });
  }

  {return cardItem;}
};

prepareTestData().forEach((offer) => {
  testCardListFragment.appendChild(fillCardData(offer));
});

mapTarget.appendChild(testCardListFragment);
