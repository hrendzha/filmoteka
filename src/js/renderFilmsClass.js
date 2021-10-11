import fetchFilmClass from './fetchFilmClass';
import filmsCards from '../templates/films.hbs';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const listFilms = document.querySelector('.list-movies');

class RenderFilms {
  constructor() {}
  // Основная функция
  async renderTrendingMovies() {
    try {
      const films = await this.getMovies();
      const filmsWithGanre = await this.getGanre(films);
      this.renderCards(filmsWithGanre);
    } catch (error) {
      Loading.hourglass('Временые неполадки');
      console.log(error);
    }
  }
  // get films
  async getMovies() {
    const response = await fetchFilmClass.getTrending();
    const films = response.results;
    return films;
  }
  //Get fiilms with ganre
  async getGanre(films) {
    const ganre = films.map(async film => {
      let id = film.id;
      const ganreObj = await fetchFilmClass.getGenresByFilmId(id);
      const ganres = ganreObj.map(function (ganre) {
        return ganre.name;
      });
      if (ganres.length > 2) {
        const shortGanres = ganres.splice(0, 2);
        shortGanres.push('Other');
        film.ganre = shortGanres;
      } else {
        film.ganre = ganres;
      }

      film.release_date = film.release_date.slice(0, 4);
      return film;
    });
    const friends = await Promise.all(ganre);
    return friends;
  }
  // render
  renderCards(films) {
    Loading.hourglass();
    listFilms.innerHTML = '';
    listFilms.insertAdjacentHTML('beforeend', filmsCards(films));
    Loading.remove();
  }
}

export default new RenderFilms();
const renderFilms = new RenderFilms();
renderFilms.renderTrendingMovies();
