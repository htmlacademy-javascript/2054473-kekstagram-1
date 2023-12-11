import {isEscapeKey} from './util.js';
import {closeImageUpload, onFormEscKeydown} from './image-upload.js';

let statusModal;
let statusButton;
let insideModal;
let statusTemplate;

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
  statusTemplate = document.querySelector(`#${status}`)
    .content
    .querySelector(`.${status}`);
  statusModal = document.body.appendChild(statusTemplate.cloneNode(true));
  statusButton = document.querySelector(`.${status}__button`);
  insideModal = statusModal.querySelector(`.${status}__inner`);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
  statusButton.addEventListener('click', hideStatusModal);
};

function onOutsideClick (evt) {
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
