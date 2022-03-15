const PRICE_SUFFIX_RU = '<span>₽/ночь</span>';

const ROOM_TEXT_RU = {
  ONE_ROOM_TEXT: 'комната',
  PLURAL_ROOM_TEXT: 'комнаты',
  MORE_ROOM_TEXT: 'комнат',
  UNKNOWN_ROOM_TEXT: 'Число комнат не указано',
};

const GUEST_TEXT_RU = {
  ONE_GUEST_TEXT: 'гостя',
  PLURAL_GUEST_TEXT: 'гостей',
  TOO_MUCH_GUEST_TEXT: 'не для гостей',
  UNKNOWN_GUEST_TEXT: 'Число гостей не указано',
};

const GUEST_LIMIT = {
  NUM_GUESTS_UNKNOWN: 0,
  NUM_GUESTS_MAX_LIMIT: 100,
};


const getPriceSuffix = () => PRICE_SUFFIX_RU;
const getRoomText = () => ROOM_TEXT_RU;
const getGuestText = () => GUEST_TEXT_RU;
const getGuestLimit = () => GUEST_LIMIT;

export { getPriceSuffix, getRoomText, getGuestText, getGuestLimit};
