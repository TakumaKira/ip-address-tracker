import axios from 'axios';

function get(url) {
  const promise = new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
  return promise;
}

export { get };