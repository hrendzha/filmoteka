import './sass/main.scss';
import filmsCards from './templates/films.hbs';
import renderFilms from './js/renderFilmsClass';

const TMDB_API_KEY = 'e51fa7aa1819bb081f9c2dbbae1f5e9d';

renderFilms.renderTrendingMovies();

import LibraryApi from './js/library-api';

const div = document.querySelector('div');

const library = new LibraryApi();

div.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') return;
  const { target: btn } = e;

  const id = Math.floor(Math.random() * (500 - 100) + 100);
  const action = btn.dataset.action;

  library.addOrRemoveFilmsFromLs(id, action);
});

renderFilms.renderMoviesFromViewed('queue');
