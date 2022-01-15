import * as validate from 'ip-validator';
import isValidDomain from 'is-valid-domain';
import config from '../config.json';
import { get } from './http';
import GeoServiceUrlGenerator from './geoServiceUrlGenerator';
import processLocation from './processLocation';

export default function getLocation(query) {
  const urlGenerator = new GeoServiceUrlGenerator();
  if (!query) {
  } else if (validate.ipv4(query) || validate.ipv6(query)) {
    urlGenerator.PARAMS.IP_ADDRESS.value = query;
  } else if (isValidDomain(query)) {
    urlGenerator.PARAMS.DOMAIN.value = query;
  } else {
    return new Promise((resolve, reject) => {
      reject(new Error(config.labels.INVALID_IP_OR_DOMAIN));
    });
  }
  return get(urlGenerator.getUrl())
    .then(location => processLocation(location))
    .catch(error => {throw new Error(config.labels.FAILED_TO_GET_DATA)});
}
