import * as basicLightbox from 'basiclightbox'
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css'
import modalTmp from '../templates/filmModal'
import FilmsAPI from '../js/fetchFilmClass'

const filmModalOpen = document.querySelector('.list-movies')
const modalClose = document.querySelector('.modal_close');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal_content')
const instance = basicLightbox.create(overlay)

function renderModalContent(film) {
    const modalMarkup = modalTmp(film)
    modalContent.insertAdjacentHTML('beforeend', modalMarkup);
}

function createModal(id) {
    FilmsAPI.getFilmById(id).then((result) => { renderModalContent(result) })
}

filmModalOpen.addEventListener('click', (e) => {
    if (e.target.classList.contains('movie__img')) {
        console.log(e.target.parentNode.parentNode.dataset.id)
        instance.show()
        createModal(e.target.parentNode.parentNode.dataset.id)
        document.addEventListener('keydown', closeModal);
        modalClose.addEventListener('click', closeModal);
    }
})

function closeModal(e) {
    if (e.key === 'Escape' || e.target.classList.contains('icon-modal-close')){
        instance.close()
        console.log(modalContent)
        document.removeEventListener('keydown', closeModal);
        modalClose.removeEventListener('click', closeModal);
    }
    }
