import { Loading } from 'notiflix/build/notiflix-loading-aio';
class LoaderSpinner {
  constructor() {}
  startSpinner() {
    Loading.hourglass({
      svgColor: '#ff6b01',
    });
  }
  removeSpinner() {
    Loading.remove();
  }
  errorSpinner() {
    Loading.hourglass('Временные неполадки', {
      svgColor: '#ff6b01',
    });
  }
}
export default new LoaderSpinner();
