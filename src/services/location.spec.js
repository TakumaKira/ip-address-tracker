import * as validator from 'ip-validator';
import config from '../config.json';
import * as http from './http';
import getLocation, { BASE_URL, PARAM_API_KEY, PATH } from './location';
import processLocation from './processLocation';

let mockGet;
const mockipv4 = jest.fn();
const mockipv6 = jest.fn();
const validIPv4 = '8.8.8.8';
const validIPv6 = '0000:0000:0000:0000:0000:0000:0000:0001';
const validDomain = 'google.com';

beforeEach(() => {
  mockGet = jest.spyOn(http, 'get');
  mockipv4.mockImplementation(ip => ip === validIPv4);
  mockipv6.mockImplementation(ip => ip === validIPv6);
  validator.ipv4 = mockipv4;
  validator.ipv6 = mockipv6;
});

it(`should resolve processed location object when success`, async () => {
  const location = {
    ip: '8.8.8.8',
    location: {
      country: 'US',
      region: 'California',
      city: 'Mountain View',
      lat: 37.40599,
      lng: -122.078514,
      postalCode: '94043',
      timezone: '-07:00',
      geonameId: 5375481
    },
    domains: [
      '0d2.net',
      '003725.com',
      '0f6.b0094c.cn',
      '007515.com',
      '0guhi.jocose.cn'
    ],
    as: {
      asn: 15169,
      name: 'Google LLC',
      route: '8.8.8.0/24',
      domain: 'https://about.google/intl/en/',
      type: 'Content'
    },
    isp: 'Google LLC'
  };
  mockGet.mockResolvedValue(location);
  await expect(getLocation()).resolves.toEqual(processLocation(location));
  expect(mockGet).toHaveBeenLastCalledWith(`${BASE_URL}/${PATH}?${PARAM_API_KEY}`);
  await expect(getLocation(validIPv4)).resolves.toEqual(processLocation(location));
  expect(mockGet).toHaveBeenLastCalledWith(`${BASE_URL}/${PATH}?${PARAM_API_KEY}&ipAddress=${validIPv4}`);
  await expect(getLocation(validIPv6)).resolves.toEqual(processLocation(location));
  expect(mockGet).toHaveBeenLastCalledWith(`${BASE_URL}/${PATH}?${PARAM_API_KEY}&ipAddress=${validIPv6}`);
  await expect(getLocation(validDomain)).resolves.toEqual(processLocation(location));
  expect(mockGet).toHaveBeenLastCalledWith(`${BASE_URL}/${PATH}?${PARAM_API_KEY}&domain=${validDomain}`);
});

it(`should reject error if failed`, async () => {
  const error = new Error(config.labels.FAILED_TO_GET_DATA);
  mockGet.mockRejectedValue(error);
  await expect(getLocation(validIPv4)).rejects.toEqual(error);
  await expect(getLocation(validIPv6)).rejects.toEqual(error);
  await expect(getLocation(validDomain)).rejects.toEqual(error);
});

it(`should reject error if invalid query is passed`, async () => {
  const error = new Error(config.labels.INVALID_IP_OR_DOMAIN);
  await expect(getLocation('a')).rejects.toEqual(error);
});
