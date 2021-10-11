import storage from './local-storage';

const LS_KEYS = {
  watched: 'watched',
  queue: 'queue',
};

function addFilmInWatchedOrQueue(filmId, action) {
  if (!filmId) return;

  const key = action === 'add to watched' ? LS_KEYS.watched : LS_KEYS.queue;
  const isLsValueEmpty = storage.load(key);
  const arrayId = isLsValueEmpty ? [filmId] : storage.load(key);

  if (isLsValueEmpty) storage.save(key, arrayId);

  arrayId.push(filmId);
  storage.save(key, arrayId);
}

export default addFilmInWatchedOrQueue;
