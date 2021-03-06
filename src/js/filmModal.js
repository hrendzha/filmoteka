import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import modalTmp from '../templates/filmModal';
import FilmsAPI from '../js/fetchFilmClass';
import library from './library-api';
import renderFilms from './renderFilmsClass';
import storage from './local-storage';

const filmModalOpen = document.querySelector('.list-movies');
const isLibraryHtml = location.pathname.includes('library.html');

function createModal(id) {
  FilmsAPI.getFilmById(id).then(result => {
    const modalMarkup = modalTmp(result);
    const modal = basicLightbox.create(modalMarkup, {
      onClose: () => {
        enableScroll();
        rerenderMovies();
      },
    });
    modal.show();
    disableScroll();

    document.querySelector('.trailer').addEventListener('click', () => {
      FilmsAPI.getFilmTrailers(id)
        .then(data => {
          const link = data;
          const modalTrailer = basicLightbox.create(`
            <iframe width="516" class="trailer_iframe" height="315" src='${link}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <button class="trailer_close">
                   <span class="material-icons"> close </span>
                </button>
            `);
          modalTrailer.show();
          document.querySelector('.trailer_close').addEventListener('click', () => {
            modalTrailer.close();
          });
        })
        .catch(() => {
          Notify.failure('This film has no one trailer :(', {
            showOnlyTheLastOne: true,
          });
        });
    });

    const modalClose = document.querySelector('.modal_close');
    document.addEventListener('keydown', closeModal);
    modalClose.addEventListener('click', closeModal);
    function closeModal(e) {
      if (e.key === 'Escape' || e.target.classList.contains('material-icons')) {
        modal.close();
        document.removeEventListener('keydown', closeModal);
        modalClose.removeEventListener('click', closeModal);
      }
    }
    function disableScroll() {
      document.querySelector('.basicLightbox').style.overflow = 'overlay';
      document.querySelector('body').style.overflow = 'hidden';
    }
    function enableScroll() {
      document.querySelector('.basicLightbox').style.overflow = 'hidden';
      document.querySelector('body').style.overflow = 'auto';
    }
    const watchedBtn = document.querySelector('.add_to_watched');
    const queueBtn = document.querySelector('.add_to_queue');
    changeBtnValue();
    function changeBtnValue(e) {
      e && addOrRemoveFilmsLs(e);
      const isMovieInWatched = storage.load(storage.LS_KEYS.watched)?.includes(id);
      const isMovieInQueue = storage.load(storage.LS_KEYS.queue)?.includes(id);

      if (e?.target.classList.contains('add_to_watched') || isMovieInWatched) {
        watchedBtn.value = 'Added to watched';
        watchedBtn.classList.add('added_to_w');
        watchedBtn.classList.remove('add_to_watched');
      } else {
        if (e?.target.classList.contains('added_to_w')) {
          watchedBtn.value = 'Add to watched';
          watchedBtn.classList.add('add_to_watched');
          watchedBtn.classList.remove('added_to_w');
        }
      }
      if (e?.target.classList.contains('add_to_queue') || isMovieInQueue) {
        queueBtn.value = 'Added to queue';
        queueBtn.classList.add('added_to_q');
        queueBtn.classList.remove('add_to_queue');
      } else {
        if (e?.target.classList.contains('added_to_q')) {
          queueBtn.value = 'Add to queue';
          queueBtn.classList.add('add_to_queue');
          queueBtn.classList.remove('added_to_q');
        }
      }
    }
    watchedBtn.addEventListener('click', changeBtnValue);
    queueBtn.addEventListener('click', changeBtnValue);
  });
}

function openModal(e) {
  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'H2') {
    createModal(e.target.closest('.movie').dataset.id);
  }
}

filmModalOpen.addEventListener('click', openModal);

function addOrRemoveFilmsLs(e) {
  const filmId = e.target.closest('.modal_buttons').dataset.id;
  const action = e.target.dataset.action;

  library.addOrRemoveFilmsFromLs(filmId, action);
}

function rerenderMovies() {
  if (!isLibraryHtml) return;
  const list = document.querySelector('[data-list].active').dataset.list;
  renderFilms.renderMoviesFromViewedOrQueue(list);
}
