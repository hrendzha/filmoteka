import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import modalTmp from '../templates/filmModal';
import FilmsAPI from '../js/fetchFilmClass';
import library from './library-api';

const filmModalOpen = document.querySelector('.list-movies');
const modalClose = document.querySelector('.modal_close');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal_content');
const watchedBtn = document.querySelector('.add_to_watched');
const queueBtn = document.querySelector('.add_to_queue');

const instance = basicLightbox.create(overlay);

function renderModalContent(film) {
  const modalMarkup = modalTmp(film);
  modalContent.insertAdjacentHTML('beforeend', modalMarkup);
}

function createModal(id) {
  FilmsAPI.getFilmById(id).then(result => {
    renderModalContent(result);
  });
}

filmModalOpen.addEventListener('click', e => {
  if (e.target.classList.contains('movie__img')) {
    instance.show();
    createModal(e.target.parentNode.parentNode.dataset.id);
    document.addEventListener('keydown', closeModal);
    modalClose.addEventListener('click', closeModal);

    modalContent.addEventListener('click', onModalClick);
  }
});

function closeModal(e) {
  if (e.key === 'Escape' || e.target.classList.contains('icon-modal-close')) {
    instance.close();
    document.removeEventListener('keydown', closeModal);
    modalClose.removeEventListener('click', closeModal);
  }
}

function changeBtnValue(e) {
  if (e.target.classList.contains('add_to_watched')) {
    watchedBtn.value = 'Added to watched';
    watchedBtn.classList.add('added');
    console.log('1');
  }
  if (e.target.classList.contains('added')) {
    watchedBtn.value = 'Remove from watched';
    watchedBtn.classList.remove('added');
    console.log('2');
  }
}
function checkedQueueBtn() {
  queueBtn.value = 'Added to queue';
}

// watchedBtn.addEventListener('click', changeBtnValue)

function onModalClick(e) {
  if (e.target.nodeName !== 'INPUT') return;
  const filmId = e.target.closest('.modal_buttons').dataset.id;
  const action = e.target.dataset.action;

  library.addOrRemoveFilmsFromLs(filmId, action);
}
