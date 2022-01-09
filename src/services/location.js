import * as validate from 'ip-validator';
import isValidDomain from 'is-valid-domain';
import config from '../config.json';
import { get } from './http';
import processLocation from './processLocation';

export const BASE_URL = 'https://geo.ipify.org/api/v2';
export const PATH = 'country,city';
export const PARAM_API_KEY = `apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`;

export default function getLocation(query) {
  let params = '';
  if (!query) {
    params = PARAM_API_KEY;
  } else if (validate.ipv4(query) || validate.ipv6(query)) {
    params = `${PARAM_API_KEY}&ipAddress=${query}`;
  } else if (isValidDomain(query)) {
    params = `${PARAM_API_KEY}&domain=${query}`;
  } else {
    return new Promise((resolve, reject) => {
      reject(new Error(config.labels.INVALID_IP_OR_DOMAIN));
    });
  }
  return get(`${BASE_URL}/${PATH}?${params}`)
    .then(location => processLocation(location))
    .catch(error => {throw new Error(config.labels.FAILED_TO_GET_DATA)});
}
