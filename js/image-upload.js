import {isEscapeKey} from './util.js';
import {setDefault} from './slider.js';

const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const imageUploadCancel = uploadModal.querySelector('.img-upload__cancel');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const preview = uploadModal.querySelector('.img-upload__preview img');

const openImageUpload = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
};

const closeImageUpload = () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  setDefault();
};

function onFormEscKeydown ('keydown', (evt)) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeImageUpload();
    uploadForm.reset();
  }
}

const effectsPreview = document.querySelectorAll('.effects__preview');
const changeFiltersBackground = (objURL) => {
  effectsPreview.forEach((effect) => {
    effect.style.backgroundImage = `url('${objURL}')`;
  });
};

fileChooser.addEventListener('change', () => {
  openImageUpload();
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((someMatch) => fileName.endsWith(someMatch));
  if (matches) {
    const photoURL = URL.createObjectURL(file);
    preview.src = photoURL;
    changeFiltersBackground(photoURL);
  }
});

imageUploadCancel.addEventListener('click', closeImageUpload);

export {closeImageUpload, onFormEscKeydown};
