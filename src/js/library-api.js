import storage from './local-storage';

class LibraryApi {
  constructor() {}

  addOrRemoveFilmsFromLs(filmId, action) {
    if (!filmId) return;
    const key = action === 'add to watched' ? storage.LS_KEYS.watched : storage.LS_KEYS.queue;
    const hasRemove = storage.load(key)?.includes(filmId);

    if (hasRemove) {
      this.removeFilmFromWatchedOrQueue(filmId, key);
      return;
    }

    this.addFilmInWatchedOrQueue(filmId, key);
  }

  addFilmInWatchedOrQueue(filmId, lsKey) {
    const isLsValue = storage.load(lsKey);
    const arrayId = isLsValue ? storage.load(lsKey) : [filmId];

    if (!isLsValue) {
      storage.save(lsKey, arrayId);
      return;
    }

    arrayId.push(filmId);
    storage.save(lsKey, arrayId);
  }

  removeFilmFromWatchedOrQueue(filmId, lsKey) {
    const movieIndex = storage.load(lsKey).indexOf(filmId);
    const newArrayWithRemovedFilm = storage.load(lsKey);
    newArrayWithRemovedFilm.splice(movieIndex, 1);
    storage.save(lsKey, newArrayWithRemovedFilm);
  }
}

export default LibraryApi;
