import './sass/main.scss';
import './js/filmModal';
import './js/scroll-to-top-btn';
import './js/footer-modal.js';
import renderFilms from './js/renderFilmsClass';
import refs from './js/refs';

renderFilms.renderMoviesFromViewedOrQueue('watched');

refs.libraryBtnsContainer.addEventListener('click', onLibraryBtnsClick);

function onLibraryBtnsClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const list = e.target.dataset.list;

  renderFilms.renderMoviesFromViewedOrQueue(list);
  toggleActiveClassBetweenBtns(list);
}

function toggleActiveClassBetweenBtns(btn) {
  if (btn === 'watched') {
    refs.watchedBtn.classList.add('active');
    refs.queueBtn.classList.remove('active');
    return;
  }

  refs.queueBtn.classList.add('active');
  refs.watchedBtn.classList.remove('active');
}
