import {isEscapeKey} from './util.js';

const commentsContainer = document.querySelector('.social__comments');
const commentSample = document.querySelector('#social__comment')
  .content
  .querySelector('.social__comment');

const bigPicture = document.querySelector('.big-picture');
const commentCount = bigPicture.querySelector('.uploaded__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const COMMENTS_UPLOAD_COUNT = 5;

const renderComments = (comments, start = 0) => {
  if (start + COMMENTS_UPLOAD_COUNT >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
  const endIndex = Math.min(start + COMMENTS_UPLOAD_COUNT, comments.length);
  commentCount.textContent = String(endIndex);
  comments.slice(start, endIndex).forEach(({avatar, name, message}) => {
    const commentElement = commentSample.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsContainer.append(commentElement);
  });
};

const loadNewComments = (comments) => {
  let currentStart = 0;
  return function () {
    currentStart += COMMENTS_UPLOAD_COUNT;
    renderComments(comments, currentStart);
  };
};

let newComments;

const openBigPicture = ({url, description, likes, comments}) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  document.body.classList.add('modal-open');
  commentsContainer.innerHTML = '';
  renderComments(comments);
  newComments = loadNewComments(comments);
  commentsLoader.addEventListener('click', newComments);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoader.removeEventListener('click', newComments);
};

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture, closeBigPicture, onPopupEscKeydown};
