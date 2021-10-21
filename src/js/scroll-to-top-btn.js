const offset = 200;
const scrollUp = document.querySelector('.scroll-up');

const getTop = () => document.documentElement.scrollTop;

window.addEventListener('scroll', () => {

    if (getTop() > offset) {
        scrollUp.classList.add('scroll-up--active');
    } else {
        scrollUp.classList.remove('scroll-up--active');
    }
})

scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})