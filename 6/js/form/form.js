// //модуль работы с формой

const disableElementList = (elementList) => {
  elementList.forEach((element) => element.setAttribute('disabled', 'true'));
};

const enableElementList = (elementList) => {
  elementList.forEach((element) => element.removeAttribute('disabled'));
};

const getFormElementList = (form) => {
  const elementList = form.querySelectorAll('fieldset, select');
  return elementList;
};

const disableForm = (form) => {
  form.classList.add('ad-form--disabled');
  const formElementList = getFormElementList(form);
  if (formElementList) {
    disableElementList(formElementList);
  }
};

const enableForm = (form) => {
  form.classList.remove('ad-form--disabled');
  const formElementList = getFormElementList(form);
  if (formElementList) {
    enableElementList(formElementList);
  }
};

export { disableForm, enableForm };
