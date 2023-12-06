const decreaseScaleButton = document.querySelector('.scale__control--smaller');
const increaseScaleButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const changeScale = (sign) => {
  const previousScaleValue = parseInt(scaleValue.value, 10);
  let updatedScaleValue = previousScaleValue + sign * SCALE_STEP;
  updatedScaleValue = updatedScaleValue > MAX_SCALE ? MAX_SCALE : updatedScaleValue;
  updatedScaleValue = updatedScaleValue < MIN_SCALE ? MIN_SCALE : updatedScaleValue;
  const imagePreview = document.querySelector('.img-upload__preview img');
  imagePreview.style.transform = `scale(${updatedScaleValue * 0.01})`;
  scaleValue.value = `${updatedScaleValue}%`;
};

decreaseScaleButton.addEventListener('click', () => {
  changeScale(-1);
});

increaseScaleButton.addEventListener('click', () => {
  changeScale(1);
});
