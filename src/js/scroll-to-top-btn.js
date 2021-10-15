import throttle from 'lodash.throttle';

export default class ScrollToTopBtn {
    constructor(selector) {
        this.btnRef = document.querySelector(selector);
        this.lastScrollTop = 0;
    }

    onScroll() {
        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop < 500 || scrollTop > this.lastScrollTop) {
            this.btnRef.classList.remove('show');
        } else {
            this.btnRef.classList.add('show');
        }

        this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    onScrollToTopBtnClick() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
}

const scrollToTopBtn = new ScrollToTopBtn('.scrollToTopBtn');
console.log(scrollToTopBtn.btnRef);

document.addEventListener('scroll', throttle(scrollToTopBtn.onScroll.bind(scrollToTopBtn), 250));
scrollToTopBtn.btnRef.addEventListener('click', scrollToTopBtn.onScrollToTopBtnClick);