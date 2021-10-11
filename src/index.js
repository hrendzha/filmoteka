import './sass/main.scss';
import filmsCards from './templates/films.hbs';

const TMDB_API_KEY = 'e51fa7aa1819bb081f9c2dbbae1f5e9d';

import addFilmInWatched from './js/add-films-in-lc';

const div = document.querySelector('div');

div.addEventListener('click', e => {
  if (e.target.nodeName === 'BUTTON') {
    const { target: btn } = e;

    const id = Math.floor(Math.random() * 100);

    addFilmInWatched(id);
    console.log(btn.dataset.action);
  }
});
