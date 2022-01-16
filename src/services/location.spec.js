import * as validator from 'ip-validator';
import config from '../config.json';
import google8888Ip from '../mockResponseData/google8888Ip.json';
import GeoServiceUrlGenerator from './geoServiceUrlGenerator';
import * as http from './http';
import getLocation from './location';
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
  mockGet.mockResolvedValue(google8888Ip);
  await expect(getLocation()).resolves.toEqual(processLocation(google8888Ip));
  const urlGenerator1 = new GeoServiceUrlGenerator();
  expect(mockGet).toHaveBeenLastCalledWith(urlGenerator1.getUrl());

  const urlGenerator2 = new GeoServiceUrlGenerator();
  urlGenerator2.PARAMS.IP_ADDRESS.value = validIPv4;
  await expect(getLocation(validIPv4)).resolves.toEqual(processLocation(google8888Ip));
  expect(mockGet).toHaveBeenLastCalledWith(urlGenerator2.getUrl());

  urlGenerator2.PARAMS.IP_ADDRESS.value = validIPv6;
  await expect(getLocation(validIPv6)).resolves.toEqual(processLocation(google8888Ip));
  expect(mockGet).toHaveBeenLastCalledWith(urlGenerator2.getUrl());

  const urlGenerator3 = new GeoServiceUrlGenerator();
  urlGenerator3.PARAMS.DOMAIN.value = validDomain;
  await expect(getLocation(validDomain)).resolves.toEqual(processLocation(google8888Ip));
  expect(mockGet).toHaveBeenLastCalledWith(urlGenerator3.getUrl());
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
