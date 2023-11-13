import {isEscapeKey} from './util.js';

const commentsContainer = document.querySelector('.social__comments');
const commentSample = document.querySelector('#social__comment')
  .content
  .querySelector('.social__comment');

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';
  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentSample.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsContainer.append(commentElement);
  });
};

const bigPicture = document.querySelector('.big-picture');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const openBigPicture = ({url, description, likes, comments}) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  document.body.classList.add('modal-open');
  renderComments(comments);
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture, closeBigPicture};
