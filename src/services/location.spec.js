import getLocation from './location';
import processLocation from './processLocation';
import * as http from './http';

let mockGet;

beforeEach(() => {
  mockGet = jest.spyOn(http, 'get');
});

it(`should resolve processed location object when success`, async () => {
  const location = {
    ip: '192.212.174.101',
    location: {
      country: 'US',
      region: 'California',
      city: 'South San Gabriel',
      lat: 34.04915,
      lng: -118.09462,
      postalCode: '',
      timezone: '-08:00',
      geonameId: 5397771
    },
    as: {
      asn: 7127,
      name: 'SCE',
      route: '192.212.0.0/15',
      domain: '',
      type: ''
    },
    isp: 'Southern California Edison'
  };
  mockGet.mockResolvedValue(location);
  await expect(getLocation()).resolves.toEqual(processLocation(location));
});

it(`should reject error when when failed`, async () => {
  const error = new Error('test error');
  mockGet.mockRejectedValue(error);
  await expect(getLocation()).rejects.toEqual(error);
});
