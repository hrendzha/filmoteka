import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Pagination from 'tui-pagination';
import fetchFilmApi from "./fetchFilmClass";
import filmsRender from './renderFilmsClass';

const container = document.getElementById('tui-pagination-container');
const searchInput = document.querySelector('.form-search');
const pagination = new Pagination(container, {
    itemsPerPage: 20,
    visiblePages: 7,
});

searchInput.addEventListener('submit', searcheHandler);

function searcheHandler(e) {
    e.preventDefault();

    const searcheQuery = e.currentTarget.elements.query.value;
    const normalizedQuery = searcheQuery.trim();

    if (normalizedQuery === "") {
        Notify.failure('Search result not succesfull.Enter the correct movie name',{
            showOnlyTheLastOne: true,
        });
        return
    }
    
    fetchFilmApi.getFilmsByQuery(normalizedQuery).then(r => {
        container.innerHTML = "";
        if (r.results.length === 0) {
           Notify.failure('Search result not succesfull.Enter the correct movie name',{
            showOnlyTheLastOne: true,
           });
        }

        pagination.reset(r.total_results);
        pagination.on('afterMove', event => {
            const currentPage = event.page;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            filmsRender.renderMoviesByQuery(normalizedQuery,currentPage);
        });
        
        container.hidden = r.results.length < 20 ? true : false;
    })
    filmsRender.renderMoviesByQuery(normalizedQuery);
}


