// //модуль работы с формой

const disableElementList = (elementList) => {
  Object.values(elementList).forEach((element) => element.setAttribute('disabled', ''));
};

const enableElementList = (elementList) => {
  Object.values(elementList).forEach((element) => element.removeAttribute('disabled'));
};

const getFormElementList = (form) => {
  // const elementList = form.querySelectorAll('fieldset, select');
  const elementList = form.elements;
  return elementList;
};

const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
  const formElementList = getFormElementList(form);
  disableElementList(formElementList);
};

const enableForm = (form) => {
  form.classList.remove('ad-form--disabled');
  const formElementList = getFormElementList(form);
  enableElementList(formElementList);
};

export { disableForm, enableForm };
