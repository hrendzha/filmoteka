import * as basicLightbox from 'basiclightbox'
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css'
import modalTmp from '../templates/filmModal'
import FilmsAPI from '../js/fetchFilmClass'

const filmModalOpen = document.querySelector('.list-movies')
const modalClose = document.querySelector('.modal_close');
const overlay = document.querySelector('.overlay');

const instance = basicLightbox.create(overlay)


function renderModalContent(film) {
    const modalMarkup = modalTmp(film)
    modalClose.insertAdjacentHTML('afterend', modalMarkup);
}

function createModal(e) {
    // const id = e.target.dataset.id;
    FilmsAPI.getFilmById(438631).then((r) => { renderModalContent(r) })

}

filmModalOpen.addEventListener('click', (e) => {
    if (e.target.classList.contains('movie__img')) {
        instance.show()
        createModal()
        document.addEventListener('keydown', closeModal);
        modalClose.addEventListener('click', closeModal);
    }
})

function closeModal(e) {
    if (e.key === 'Escape' || e.target.classList.contains('icon-modal-close')){
        instance.close()
        document.removeEventListener('keydown', closeModal);
        modalClose.removeEventListener('click', closeModal);
    }
    }
