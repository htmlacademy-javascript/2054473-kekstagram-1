import {isEscapeKey} from './util.js';

const imageUploadForm = document.querySelector('.img-upload__overlay');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadCancel = imageUploadForm.querySelector('.img-upload__cancel');
let preview;

const openImageUpload = () => {
  imageUploadForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
};

const closeImageUpload = () => {
  imageUploadForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  preview = imageUploadForm.querySelector('.img-upload__preview');
  preview.src = '';
};

function onFormEscKeydown (evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeImageUpload();
    imageUploadForm.reset();
  }
}

const addNewImage = (file) => {
  const reader = new FileReader();
  reader.onload = function(e) {
    const imageUrl = e.target.result;
    preview = imageUploadForm.querySelector('.img-upload__preview');
    preview.innerHTML = `<img class="img-upload__uploaded-picture" src="${imageUrl}" alt="Preview">`;
  };
  reader.readAsDataURL(file);
};

const effectsPreview = document.querySelectorAll('.effects__preview');

imageUploadInput.addEventListener('change', (evt) => {
  openImageUpload();
  addNewImage(evt.target.files[0]);
  const uploadedPicture = document.querySelector('.img-upload__uploaded-picture');
  effectsPreview.forEach((effect) => {
    effect.style.backgroundImage = `url('${uploadedPicture.src}')`;
  });
});

imageUploadCancel.addEventListener('click', closeImageUpload);

export {closeImageUpload, onFormEscKeydown};
