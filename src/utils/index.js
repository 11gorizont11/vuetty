const ID = '497202e91b90346fd72bd25fb2580784';

export default {
  getForecastByCityName: (city) => {
    const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${ID}`;
    return fetch(URL).then((resp) => {
      if (resp.ok) {
        return Promise.resolve(resp);
      }
      return Promise.reject(new Error(resp.statusText));
    })
      .then(resp => resp.json())
      .catch((error) => {
        // eslint-disable-next-line
        console.error('Request failed', error)});
  },
};
