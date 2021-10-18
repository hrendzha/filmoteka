import Pagination from 'tui-pagination';
import filmsApi from './fetchFilmClass';
import filmsRender from './renderFilmsClass'
import 'tui-pagination/dist/tui-pagination.min.css';

const container = document.getElementById('tui-pagination-container');

const windowInnerWidth = document.documentElement.clientWidth;
const pointBreak = 370;
let pageVisible = 7;
if(windowInnerWidth < pointBreak) pageVisible = 3;
let pagination = new Pagination(container, {
            itemsPerPage: 20,
            visiblePages: pageVisible,
});
const mediaQuery = window.matchMedia('(min-width: '+pointBreak+'px)')
function handleTabletChange(e) {
    const pageCurrent = pagination.getCurrentPage()
    if (e.matches) {
        pagination.init(container, {
            totalItems: 1000,
            itemsPerPage: 20,
            visiblePages: 7,
            page: pageCurrent,
        });
        
    }
    else {
        pagination.init(container, {
            totalItems: 1000,
            itemsPerPage: 20,
            visiblePages: 3,
            page: pageCurrent,
        });
        
    }
};
mediaQuery.addListener(handleTabletChange);

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
        localStorage.setItem('page', currentPage);
        filmsRender.renderTrendingMovies(currentPage);
});
}

async function fetchTrending(currentPage){
    const response = await filmsApi.getTrending(currentPage)
    return response;
}