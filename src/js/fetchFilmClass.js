import axios from 'axios';
import spinner from './spinnerClass';

class FilmsAPI {
  constructor(key) {
    this.baseURL = 'https://api.themoviedb.org/3';
    this.key = key;
  }
  async getTrending(page) {
    spinner.startSpinner();
    try {
      const response = await axios.get(
        `${this.baseURL}/trending/movie/day?api_key=${this.key}&page=${page}`,
      );
      spinner.removeSpinner();
      const trending = response.data;
      return trending;
    } catch (error) {
      console.log(error);
    }
  }
  async getFilmById(filmId) {
    spinner.startSpinner();
    try {
      const response = await axios.get(`${this.baseURL}/movie/${filmId}?api_key=${this.key}`);
      spinner.removeSpinner();
      const film = response.data;
      return film;
    } catch (error) {
      console.log(error);
    }
  }
  async getFilmsByQuery(query, page) {
    spinner.startSpinner();
    try {
      const response = await axios.get(
        `${this.baseURL}/search/movie?api_key=${this.key}&query=${query}&page=${page}`,
      );
      spinner.removeSpinner();
      const films = response.data;
      return films;
    } catch (error) {
      console.log(error);
    }
  }
  async getFilmTrailers(id) {
    spinner.startSpinner();
    try {
      const response = await axios.get(
        `${this.baseURL}/movie/${id}/videos?api_key=${this.key}&language=en-US`,
      );
      spinner.removeSpinner();
      const trailersdata = response.data.results;
      const trailer = `https://www.youtube.com/embed/${trailersdata[0].key}`;
      return trailer;
    } catch (error) {
      console.log(error);
    }
  }
  async getGenresByFilmId(filmId) {
    spinner.startSpinner();
    try {
      const response = await axios.get(`${this.baseURL}/movie/${filmId}?api_key=${this.key}`);
      spinner.removeSpinner();
      const genres = response.data.genres;
      return genres;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new FilmsAPI('e51fa7aa1819bb081f9c2dbbae1f5e9d');
