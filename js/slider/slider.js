import { getGlobalMinPrice, getGlobalMaxPrice  } from '../config.js';
const createSliderObject = (sliderElement) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: getGlobalMinPrice(),
      max: getGlobalMaxPrice(),
    },
    start: getGlobalMinPrice(),
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const setSliderListeners = (sliderElement, inputElement) => {
  let timerId = 0;
  sliderElement.noUiSlider.on('slide', () => {
    clearTimeout(timerId);
    inputElement.value = sliderElement.noUiSlider.get();
    timerId = setTimeout(()=>{
      inputElement.dispatchEvent(new Event('input'));
    },100);
  });

  inputElement.addEventListener('input', () => {
    sliderElement.noUiSlider.set(inputElement.value);
  } );
};

const createResetSlider = (sliderElement) => () => {
  sliderElement.noUiSlider.reset();
};

export { createSliderObject, setSliderListeners, createResetSlider};
