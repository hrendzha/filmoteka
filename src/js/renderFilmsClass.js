import fetchFilmClass from './fetchFilmClass';
import filmsCards from '../templates/films.hbs';
import storage from './local-storage';
import filmsWithRating from '../templates/films-with-rating.hbs';

const listFilms = document.querySelector('.list-movies');

class RenderFilms {
  constructor() {}
  // Основная функция
  async renderTrendingMovies(page) {
    try {
      const films = await this.getMovies(page);
      const filmsWithGenre = await this.getGenre(films);
      this.renderHomeCards(filmsWithGenre);

    } catch (error) {
      console.log(error);
    }
  }

  async renderMoviesByQuery(query,page) {
    try {
      const films = await this.getMoviesByQuery(query,page);
      const filmsWithGenre = await this.getGenre(films);
      this.renderHomeCards(filmsWithGenre);

    } catch (error) {
      console.log(error);
    }
  }
  // get film by query
  async getMoviesByQuery(query,page) {
    const response = await fetchFilmClass.getFilmsByQuery(query,page);
    const films = response.results;
    return films;
  }

  // get trending films
  async getMovies(page) {
    const response = await fetchFilmClass.getTrending(page);
    const films = response.results;
    return films;
  }
  //Get fiilms with genre

  async getGenre(films) {
    const genre = films.map(async film => {
      let id = film.id;
      const genreObj = await fetchFilmClass.getGenresByFilmId(id);
      const genres = genreObj.map(function (genre) {
        return `${genre.name},`;
      });
      if (genres.length > 2) {
        const shortGenres = genres.splice(0, 2);
        shortGenres.push('Other');
        film.genre = shortGenres;
      } else {
        if(genres[genres.length - 1]===undefined){
          film.genre = genres;
        }else{
          genres[genres.length - 1] = genres[genres.length - 1].slice(0, -1);
          film.genre = genres;
        }
      }
      film.release_date = film.release_date.slice(0, 4);
      return film;
    });
    const doneResult = await Promise.all(genre);
    return doneResult;
  }
  // render without rating
  renderHomeCards(films) {
    this.clearListFilmsMrk();
    listFilms.insertAdjacentHTML('beforeend', filmsCards(films));
  }

  renderLibraryCards(films) {
    this.clearListFilmsMrk();
    listFilms.insertAdjacentHTML('beforeend', filmsWithRating(films));
  }

  clearListFilmsMrk() {
    listFilms.innerHTML = '';
  }

  async renderMoviesFromViewedOrQueue(list) {
    const key = list === 'watched' ? storage.LS_KEYS.watched : storage.LS_KEYS.queue;

    try {
      const arrayOfPromises = storage.load(key).map(async id => {
        const movie = await fetchFilmClass.getFilmById(id);
        return {
          ...movie,
          genre: this.getCorrectGenres(movie.genres),
          release_date: this.getYearFromReleaseDate(movie.release_date),
        };
      });

      const movies = await Promise.all(arrayOfPromises);
      this.renderLibraryCards(movies);
    } catch (error) {
      console.log(error);
    }
  }

  getCorrectGenres(genresAlongId) {
    const onlyGenres = genresAlongId.map(genre => genre.name);
    return onlyGenres.length > 2 ? [...onlyGenres.slice(0, 2), 'Other'] : onlyGenres;
  }

  getYearFromReleaseDate(releaseDate) {
    return releaseDate.slice(0, 4);
  }
}

export default new RenderFilms();
