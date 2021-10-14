import fetchFilmClass from './fetchFilmClass';
import filmsCards from '../templates/films.hbs';
import filmsWithRating from '../templates/films-with-rating.hbs';
import LoaderSpinner from './spinnerClass';
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
      LoaderSpinner.errorSpinner();
      console.log(error);
    }
  }
  // get films
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
        genres[genres.length - 1] = genres[genres.length - 1].slice(0, -1);
        film.genre = genres;
      }

      film.release_date = film.release_date.slice(0, 4);
      return film;
    });
    const doneResult = await Promise.all(genre);
    return doneResult;
  }
  // render without rating
  renderHomeCards(films) {
    this.clearListFilmsMrk()
    listFilms.insertAdjacentHTML('beforeend', filmsCards(films));
  }
  renderLibaryCards(films){
    this.clearListFilmsMrk()
    listFilms.insertAdjacentHTML('beforeend', filmsWithRating(films));
  }
  clearListFilmsMrk(){
    listFilms.innerHTML = '';
  }
}

export default new RenderFilms();