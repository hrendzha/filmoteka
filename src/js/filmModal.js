import * as basicLightbox from 'basiclightbox'
import modalTmp from '../templates/filmModal.hbs'
import FilmsAPI from '../js/fetchFilmClass'


const modal = document.querySelector('.footer__link');
const modalContent = document.querySelector('.modal')
const modalClose = document.querySelector('.modal_close');
const overlay = document.querySelector('.overlay');
const overlayModal = document.querySelector('.overlay_modal')
const watchedBtn = document.querySelector('.add_to_watched')
const queueBtn = document.querySelector('.add_to_queue')

const instance = basicLightbox.create(overlay)
// const instance = basicLightbox.create(overlay, {
// 		onClose: (() => {clearContainer()} )
// 	})


function createModal(event) {
    // const id = event.target.dataset.id;
    FilmsAPI.getFilmById(87).then((r) => { renderModalContent(r) })
    document.addEventListener('keydown', closeModal);
    modalClose.addEventListener('click', closeModal);
    overlayModal.addEventListener('click', closeModal);

}
function openModal() {
    createModal()
}
modal.onclick = instance.show;


function renderModalContent(film) {
    const modalMarkup = modalTmp(film)
    modalClose.insertAdjacentHTML('afterend', modalMarkup);
}

function getTrailerUrl() {
    FilmsAPI.getFilmTrailers(87).then(res => { console.log(res);  const trailerUrl = res; return trailerUrl})
}
getTrailerUrl()

function clearContainer() {
  modalContent.innerHTML = '';
}
function closeModal(e) {
    if (e.key === 'Escape' || e.target.classList.contains('overlay_modal') || e.target.classList.contains('icon-modal-close')){
        instance.close()
        document.removeEventListener('keydown', closeModal);
        modalClose.removeEventListener('click', closeModal);
        overlayModal.removeEventListener('click', closeModal);
 
      
    }
    }

// function checkedWatchedBtn() {
//     watchedBtn.value = 'Added to watched'
// }
// function checkedQueueBtn() {
//     queueBtn.value = 'Added to queue'
// }

modal.addEventListener('click',  openModal);

