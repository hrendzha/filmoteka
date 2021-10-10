import fetchFilmClass from "./fetchFilmClass";
import filmsCards from '../templates/films.hbs';

const listFilms = document.querySelector('.list-movies')

renderTrendingMovies ()
// Основная функция
async function renderTrendingMovies (){
  try{
    const films = await getMovies()
    const filmsWithGanre = await getGanre(films)
    console.log(filmsWithGanre);
    renderCards(filmsWithGanre)
  }catch(error){
    console.log(error);
  }
 
}

// get films
async function getMovies(){
  const response = await fetchFilmClass.getTrending()
  const films = response.results
  return films
}
//Get fiilms with ganre 
async function getGanre(films){
  const ganre = films.map(async(film)=>{
    let id = film.id
    const ganreObj = await fetchFilmClass.getGenresByFilmId(id)
    const ganres = ganreObj.map(function(ganre){return ganre.name})
    film.ganre = ganres
    return film
  })
  const friends = await Promise.all(ganre);
  return friends
}
// render Films
function renderCards(films){
  listFilms.insertAdjacentHTML('beforeend', filmsCards(films) )
}
