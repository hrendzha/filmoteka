import * as basicLightbox from 'basiclightbox'
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css'

const filmModalOpen = document.querySelector('.list-movies')
const modalClose = document.querySelector('.modal_close');
const overlay = document.querySelector('.overlay');

const instance = basicLightbox.create(overlay)


    
filmModalOpen.addEventListener('click', (e) => {
    if (e.target.classList.contains('movie__img')) {
        instance.show()
        document.addEventListener('keydown', closeModal);
        modalClose.addEventListener('click', closeModal);
        console.log('ghghjg')
    }
})

function closeModal(e) {
    if (e.key === 'Escape' || e.target.classList.contains('icon-modal-close')){
        instance.close()
        document.removeEventListener('keydown', closeModal);
        modalClose.removeEventListener('click', closeModal);
        // overlay.innerHTML = '';
        console.log('gghhg')
    }
    }
