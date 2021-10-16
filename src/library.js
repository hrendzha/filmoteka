import './sass/main.scss';
import './js/filmModal';
// import './js/scroll-to-top-btn';
import renderFilms from './js/renderFilmsClass';
import refs from './js/refs';

refs.libraryBtns.addEventListener('click', onLibraryBtnsClick);

function onLibraryBtnsClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const dataset = e.target.dataset;
  const list = dataset.list === 'watched' ? 'watched' : 'queue';

  renderFilms.renderMoviesFromViewedOrQueue(list);
}
