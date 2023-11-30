import {sendData} from './api.js';
import {showStatusModal} from './success-modal.js';

const imageUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
}, false);


const isTagValid = (hashtag) => hashtag.match(/^#[a-zа-яё0-9]{1,19}$/i) || hashtag === '';

const isTagUnique = (hashtagArray) => {
  const uniqueTags = new Set(hashtagArray);
  return uniqueTags.size === hashtagArray.length;
};

const validateHashtags = (hashtags) => hashtags.split(' ').every(isTagValid)
  && hashtags.split(' ').length < 5
  && isTagUnique(hashtags.split(' '));

const getHashtagErrorMessage = (hashtags) => {
  const errorMessage = [];
  if (!hashtags.split(' ').every(isTagValid)) {
    errorMessage.push('введён невалидный тег');
  }

  if (hashtags.split(' ').length > 5) {
    errorMessage.push('превышено количество тегов');
  }

  if (!isTagUnique(hashtags.split(' '))) {
    errorMessage.push('теги повторяются');
  }

  return errorMessage.join(', ');
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

const setUserFormSubmit = async (evt) => {
  try {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      await sendData(new FormData(evt.target));
      showStatusModal('success');
      imageUploadForm.reset();
    }
  } catch (err) {
    showStatusModal('error');
  }
  unblockSubmitButton();
};


imageUploadForm.addEventListener('submit', setUserFormSubmit);
