const refs = {
    openFooterModal: document.querySelector('[data-action="open-lightbox"]'),
    closeFooterModal: document.querySelector('[data-action="close-lightbox"]'),
    lightboxFooterModal: document.querySelector('.js-lightbox'),
    backdropClick: document.querySelector('.modal-background'),
};

// open modal

refs.openFooterModal.addEventListener('click', onOpenModal);

function onOpenModal() {
    window.addEventListener('keydown', onEscClick);
    refs.lightboxFooterModal.classList.remove('visually-hidden');
    document.querySelector('body').style.overflow = 'hidden';
}

//close modal - button (icon)

refs.closeFooterModal.addEventListener('click', onCloseModal);

function onCloseModal() {
    window.removeEventListener('keydown', onEscClick);
    refs.lightboxFooterModal.classList.add('visually-hidden');
    document.querySelector('body').style.overflow = 'auto';
}

//close modal - backdrop

refs.backdropClick.addEventListener('click', onBackdropClick);
document.querySelector('body').style.overflow = 'auto';

function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
        onCloseModal();
    }
   }

//close modal = esc

function onEscClick(event) {
    const ESC_KEY_CODE = 'Escape';
    console.log(event.code);

    if (event.code === ESC_KEY_CODE) {
        onCloseModal();
    }
}