const load = key => {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : undefined;
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

const save = (key, value) => {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

export default { load, save };
