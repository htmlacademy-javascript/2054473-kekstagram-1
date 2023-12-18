import {sendData} from './api.js';
import {showStatusModal} from './success-modal.js';

const imageUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__field-wrapper--error' // Класс для элемента с текстом ошибки
}, false);


const isTagValid = (hashtag) => hashtag.match(/^#[a-zа-яё0-9]{1,19}$/i) || hashtag === '';

const splitHashtags = (tags) => tags.split(' ').filter((word) => word !== '');

const isTagUnique = (hashtagArray) => {
  const lowerArr = hashtagArray.map((item) => item.toLowerCase());
  const uniqueTags = new Set(lowerArr);
  return uniqueTags.size === lowerArr.length;
};

const validateHashtags = (hashtags) => splitHashtags(hashtags).every(isTagValid)
  && splitHashtags(hashtags).length < 5
  && isTagUnique(splitHashtags(hashtags));

const getHashtagErrorMessage = (hashtags) => {
  const errorMessages = [];
  if (!splitHashtags(hashtags).every(isTagValid)) {
    errorMessages.push('введён невалидный тег');
  }

  if (splitHashtags(hashtags).length > 5) {
    errorMessages.push('превышено количество тегов');
  }

  if (!isTagUnique(splitHashtags(hashtags))) {
    errorMessages.push('теги повторяются');
  }

  return errorMessages.join(', ');
};

pristine.addValidator(
  imageUploadForm.querySelector('.text__hashtags'),
  validateHashtags,
  getHashtagErrorMessage);

const validateComment = (comment) => comment.length <= 140;

pristine.addValidator(
  imageUploadForm.querySelector('.text__description'),
  validateComment,
  'длина комментария не может составлять больше 140 символов');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const submitButton = imageUploadForm.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const statusSuccess = 'success';
const statusError = 'error';

const setUserFormSubmit = async (evt) => {
  try {
    evt.preventDefault();
    if (pristine.validate()) {
      const error = document.querySelector('.pristine-error.img-upload__field-wrapper--error');
      if (error !== null) {
        error.remove();
      }
      blockSubmitButton();
      await sendData(new FormData(evt.target));
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      showStatusModal(statusSuccess);
      imageUploadForm.reset();
    }
  } catch (err) {
    showStatusModal(statusError);
  }
  unblockSubmitButton();
};

imageUploadForm.addEventListener('submit', setUserFormSubmit);
