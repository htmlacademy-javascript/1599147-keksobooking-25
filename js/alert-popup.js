import { isEscKey } from './utils/utils.js';

const LOAD_ALERT_MESSAGE = 'Ошибка загрузки объявлений';
const LOAD_ALERT_BUTTON_TEXT = 'Повторить загрузку';

const createPopupKeydownAction = (actionCallback) => (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    actionCallback();
  }
};

const createClickAction = (actionCallback) => () => actionCallback();

const createSuccessFormPopup = (destination, template) => {
  const onPopupEscKeydown = createPopupKeydownAction(closeSuccessPopup);

  const onPopupClick = createClickAction(closeSuccessPopup);

  function closeSuccessPopup () {
    template.remove();
    destination.removeEventListener('keydown', onPopupEscKeydown);
    destination.removeEventListener('click', onPopupClick);
  }

  return  () => {
    destination.appendChild(template);
    destination.addEventListener('keydown', onPopupEscKeydown);
    destination.addEventListener('click', onPopupClick);
  };
};

const createErrorFormPopup = (destination, template) => {
  const button = template.querySelector('.error__button');
  const onPopupEscKeydown = createPopupKeydownAction(closeErrorPopup);
  const onPopupClick = createClickAction(closeErrorPopup);

  function closeErrorPopup () {
    template.remove();
    destination.removeEventListener('keydown', onPopupEscKeydown);
    destination.removeEventListener('click', onPopupClick);
    button.removeEventListener('click', onPopupClick);
  }

  return () => {
    destination.appendChild(template);
    button.focus();
    destination.addEventListener('keydown', onPopupEscKeydown);
    destination.addEventListener('click', onPopupClick);
    button.addEventListener('click', onPopupClick);
  };
};

const createLoadErrorElement = (reloadCallback) => {

  const alertPopup = document.createElement('div');
  alertPopup.classList.add('map__error-alert');

  const alertMessage = document.createElement('span');
  alertMessage.classList.add('map__error--text');
  alertMessage.textContent = LOAD_ALERT_MESSAGE;

  const alertButton = document.createElement('button');
  alertButton.setAttribute('type', 'button');
  alertButton.textContent = LOAD_ALERT_BUTTON_TEXT;

  alertPopup.appendChild(alertMessage);
  alertPopup.appendChild(alertButton);

  const reloadData = () => {
    alertPopup.remove();
    alertButton.removeEventListener('click', reloadData);
    reloadCallback();
  };

  alertButton.addEventListener('click', reloadData);
  return alertPopup;
};

const createLoadErrorPopup = (destination, reloadCallback) => () => {
  const errorElement = createLoadErrorElement(reloadCallback);
  const referenceElement = destination.querySelector('.map__filters-container');
  destination.insertBefore(errorElement, referenceElement);
};

export { createSuccessFormPopup, createErrorFormPopup, createLoadErrorPopup };
