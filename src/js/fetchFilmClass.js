import axios from 'axios';

class FilmsAPI {
  constructor(key) {
    this.baseURL = 'https://api.themoviedb.org/3'
    this.key = key;
  }
  async getTrending() {
    try {
      const response = await axios.get(`${this.baseURL}/trending/movie/day?api_key=${this.key}`);
      const trending = response.data.results;
      return trending;
    } catch (error) {
      console.log(error);
    }
  }
  async getFilmById(filmId) {
    try {
      const response = await axios.get(`${this.baseURL}/movie/${filmId}?api_key=${this.key}`)
      const film = response.data;
      return film
    } catch (error) {
      console.log(error);
    }
  }
  async getFilmsByQuery(query) {
    try {
      const response = await axios.get(`${this.baseURL}/search/movie?api_key=${this.key}&query=${query}`)
      const films = response.data;
        return films;
    } catch (error) {
      console.log(error);
    }
  }
  async getFilmTrailers(id) {
  try {
    const response = await axios.get(`${this.baseURL}/movie/${id}/videos?api_key=${this.key}&language=en-US`);
    const trailersdata = response.data.results;
    const trailer = `https://www.youtube.com/watch?v=${trailersdata[0].key}`;
    return trailer
  }
  catch (error) {
      console.log(error);
    }
  }
  async getGenresByFilmId(filmId) {
    try {
      const response = await axios.get(`${this.baseURL}/movie/${filmId}?api_key=${this.key}`)
      const genres = response.data.genres;
      return genres;
    } catch (error) {
      console.log(error);
    }
  }

}
export default new FilmsAPI('e51fa7aa1819bb081f9c2dbbae1f5e9d');
