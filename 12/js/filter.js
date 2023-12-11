import {renderThumbnails, uploadedPhotos} from './gallery.js';
import {debounce, shuffleArray} from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 501;
const filterForm = document.querySelector('.img-filters__form');

const compareComments = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;
  return commentsB - commentsA;
};

const getFilteredPhotos = (filter, data) => {
  switch (filter) {
    case 'default':
      return data;
    case 'random':
      return shuffleArray(data.slice()).slice(0, RANDOM_PHOTOS_COUNT);
    case 'discussed':
      return data.slice().sort(compareComments);
  }
};

const debouncedRender = debounce((data) => {
  renderThumbnails(data);
}, RERENDER_DELAY);

const filterPhotos = (evt, data) => {
  if (evt.target.classList.contains('img-filters__button')) {
    const previousButton = filterForm.querySelector('.img-filters__button--active');
    previousButton.classList.remove('img-filters__button--active');
    const activeButton = evt.target;
    activeButton.classList.add('img-filters__button--active');
    const chosenFilter = activeButton.getAttribute('id').slice(7);
    const filteredPhotos = getFilteredPhotos(chosenFilter, data);
    debouncedRender(filteredPhotos);
  }
};

filterForm.addEventListener('click', (evt) => {
  filterPhotos(evt, uploadedPhotos);
});
