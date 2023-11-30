const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');

const getSliderSettings = (filter) => {
  switch (filter) {
    case 'chrome':
      return {
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      };
    case 'sepia':
      return {
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      };
    case 'marvin':
      return {
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1
      };
    case 'phobos':
      return {
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1
      };
    case 'heat':
      return {
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1
      };
  }
};

const getFilterSettings = (filter, level) => {
  switch (filter) {
    case 'chrome':
      return `grayscale(${level})`;
    case 'sepia':
      return `sepia(${level})`;
    case 'marvin':
      return `invert(${level}%)`;
    case 'phobos':
      return `blur(${level}px)`;
    case 'heat':
      return `brightness(${level})`;
  }
};

const createInitialSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
  });

  sliderElement.classList.add('hidden');
  sliderContainer.classList.add('hidden');
};

const filterItems = document.querySelectorAll('.effects__item');
const picturePreview = document.querySelector('.img-upload__preview');
let chosenEffect;

const changeFilters = () => {
  createInitialSlider();
  filterItems.forEach((item) => {
    item.addEventListener('change', (evt) => {
      chosenEffect = evt.target.value;
      if (chosenEffect === 'none') {
        sliderElement.classList.add('hidden');
        sliderContainer.classList.add('hidden');
        picturePreview.style.filter = '';
      } else {
        sliderElement.classList.remove('hidden');
        sliderContainer.classList.remove('hidden');
        const sliderSettings = getSliderSettings(chosenEffect);
        sliderElement.noUiSlider.updateOptions(sliderSettings);
      }
    });
  });
};

changeFilters();

const effectLevel = sliderContainer.querySelector('.effect-level__value');

sliderElement.noUiSlider.on('update', () => {
  effectLevel.value = sliderElement.noUiSlider.get();
  picturePreview.style.filter = getFilterSettings(chosenEffect, effectLevel.value);
});
