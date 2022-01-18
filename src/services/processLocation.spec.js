import google8888Ip from '../mockResponseData/google8888Ip.json';
import processLocation from './processLocation';

it(`should return processed object`, () => {
  const processedLocation = {
    ip: google8888Ip.ip,
    isp: google8888Ip.isp,
    city: google8888Ip.location.city,
    country: google8888Ip.location.country,
    lat: google8888Ip.location.lat,
    lng: google8888Ip.location.lng,
    postalCode: google8888Ip.location.postalCode,
    region: google8888Ip.location.region,
    timezone: google8888Ip.location.timezone
  };
  const processed = processLocation(google8888Ip);
  expect(processed).toEqual(processedLocation);
});

it(`should not throw if location object change its structure`, () => {
  const {location, ...others} = google8888Ip;
  const changedLocation = {...others};
  expect(() => processLocation(changedLocation)).not.toThrow();
});
