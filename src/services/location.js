import { get } from './http';
import processLocation from './processLocation';

const BASE_URL = 'https://geo.ipify.org/api/v2';

export default function getLocation() {
  return get(`${BASE_URL}/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`)
    .then(location => processLocation(location));
}
