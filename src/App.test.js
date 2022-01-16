import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App, { HeaderBg, StyledHeader, StyledMap } from './App';
import google8888Ip from './mockResponseData/google8888Ip.json';
import * as getLocation from './services/location';
import processLocation from './services/processLocation';

let realUseEffect;
let mockUseEffect;
let mockGetLocation;

beforeEach(() => {
  realUseEffect = React.useEffect;
  mockUseEffect = React.useEffect = jest.fn();
  mockUseEffect.mockImplementation(fn => fn());
  mockGetLocation = jest.spyOn(getLocation, 'default');
});
afterEach(() => {
  React.useEffect = realUseEffect;
});

test('renders HeaderBg, StyledMap and StyledHeader component', async () => {
  mockGetLocation.mockResolvedValue(processLocation(google8888Ip));
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  await expect(mockGetLocation()).resolves.toEqual(processLocation(google8888Ip));
  const { props: { children: [headerBgComponent, styledMapComponent, styledHeaderComponent] } } = renderer.getRenderOutput();
  expect(headerBgComponent.type).toEqual(HeaderBg);
  expect(styledMapComponent.type).toEqual(StyledMap);
  expect(styledHeaderComponent.type).toEqual(StyledHeader);
  expect(styledMapComponent.props).toEqual({
    lat: google8888Ip.location.lat,
    lng: google8888Ip.location.lng,
    locationError: false,
    mapError: false,
    setMapError: expect.any(Function),
  });
  expect(styledHeaderComponent.props).toEqual({
    ip: google8888Ip.ip,
    isp: google8888Ip.isp,
    city: google8888Ip.location.city,
    country: google8888Ip.location.country,
    postalCode: google8888Ip.location.postalCode,
    region: google8888Ip.location.region,
    timezone: google8888Ip.location.timezone,
    setLocation: expect.any(Function),
    setLocationError: expect.any(Function),
    setMapError: expect.any(Function),
  });
});

test(`should set locationError to true and log error`, async () => {
  const mockConsoleError = jest.spyOn(console, 'error');
  mockConsoleError.mockImplementation(() => {});
  const error = new Error('Test error');
  mockGetLocation.mockRejectedValue(error);
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  await expect(mockGetLocation()).rejects.toEqual(error);
  const { props: { children: [headerBgComponent, styledMapComponent, styledHeaderComponent] } } = renderer.getRenderOutput();
  expect(headerBgComponent.type).toEqual(HeaderBg);
  expect(styledMapComponent.type).toEqual(StyledMap);
  expect(styledHeaderComponent.type).toEqual(StyledHeader);
  expect(styledMapComponent.props).toEqual({
    lat: undefined,
    lng: undefined,
    locationError: true,
    mapError: false,
    setMapError: expect.any(Function),
  });
  expect(styledHeaderComponent.props).toEqual({
    ip: undefined,
    isp: undefined,
    city: undefined,
    country: undefined,
    postalCode: undefined,
    region: undefined,
    timezone: undefined,
    setLocation: expect.any(Function),
    setLocationError: expect.any(Function),
    setMapError: expect.any(Function),
  });
  expect(mockConsoleError).toBeCalledWith(error);
});
