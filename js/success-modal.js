import {isEscapeKey} from './util.js';
import {closeImageUpload, onFormEscKeydown} from './image-upload.js';

let statusModal;
let statusButton;

const hideStatusModal = () => {
  statusModal.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onFormEscKeydown);
};

const showStatusModal = (status) => {
  if (status === 'success') {
    closeImageUpload();
  } else {
    document.removeEventListener('keydown', onFormEscKeydown);
  }
  const statusTemplate = document.querySelector(`#${status}`)
    .content
    .querySelector(`.${status}`);
  statusModal = document.body.appendChild(statusTemplate.cloneNode(true));
  statusButton = document.querySelector(`.${status}__button`);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
  statusButton.addEventListener('click', hideStatusModal);
};

function onOutsideClick (evt) {
  const insideModal = statusModal.querySelector('.error__inner');
  if (!insideModal.contains(evt.target)) {
    hideStatusModal();
  }
}

function onEscKeydown (evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    hideStatusModal();
  }
}

export {showStatusModal};
