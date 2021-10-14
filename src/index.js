import './sass/main.scss';
import filmsCards from './templates/films.hbs';
import renderFilms from './js/renderFilmsClass';

const TMDB_API_KEY = 'e51fa7aa1819bb081f9c2dbbae1f5e9d';

renderFilms.renderTrendingMovies();
