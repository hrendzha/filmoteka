import Pagination from 'tui-pagination';
import filmsApi from './fetchFilmClass';
import filmsRender from './renderFilmsClass'
import 'tui-pagination/dist/tui-pagination.min.css';

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container,{
    itemsPerPage: 20,
    visiblePages: 7,
});

const userpage = localStorage.getItem('page')?localStorage.getItem('page'): 1;

loadPage(userpage);

function loadPage(currentPage) {
    fetchTrending(currentPage).then(r => {
        pagination.reset(r.total_pages);
        pagination.movePageTo(currentPage);
    })
    moveEvent();
}

function moveEvent() {
    pagination.on('afterMove', event => {
        const currentPage = event.page;
        
        localStorage.setItem('page', currentPage);
        filmsRender.renderTrendingMovies(currentPage);
});
}

async function fetchTrending(currentPage){
    const response = await filmsApi.getTrending(currentPage)
    return response;
}