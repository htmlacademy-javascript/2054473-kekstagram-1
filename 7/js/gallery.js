import {closeBigPicture, openBigPicture} from './fullscreen-mode.js';
import {picturesContainer, renderThumbnails, similarPhotoObjects} from './render-thumbnails.js';

const hidePictureButton = document.querySelector('.big-picture__cancel');

renderThumbnails();

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    openBigPicture(similarPhotoObjects.find((obj) => obj.url === evt.target.getAttribute('src')));
  }
});

hidePictureButton.addEventListener('click', closeBigPicture);
