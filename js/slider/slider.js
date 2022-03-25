import { getGlobalMinPrice, getGlobalMaxPrice  } from '../config.js';
const createSliderObject = (sliderElement) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: getGlobalMinPrice(),
      max: getGlobalMaxPrice(),
    },
    start: '',
    connect: 'lower',
  });
};

const setSliderListeners = (sliderElement, inputElement) => {
  sliderElement.noUiSlider.on('slide', () => {
    inputElement.value = sliderElement.noUiSlider.get();
  });

  inputElement.addEventListener('input', () => {
    sliderElement.noUiSlider.set(inputElement.value);
  } );
};

export { createSliderObject, setSliderListeners };
