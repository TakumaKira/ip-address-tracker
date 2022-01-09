import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App, { HeaderBg, StyledHeader, StyledMap } from './App';
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
  const mockLocationRaw = {
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
  mockGetLocation.mockResolvedValue(processLocation(mockLocationRaw));
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  await expect(mockGetLocation()).resolves.toEqual(processLocation(mockLocationRaw));
  const { props: { children: [headerBgComponent, styledMapComponent, styledHeaderComponent] } } = renderer.getRenderOutput();
  expect(headerBgComponent.type).toEqual(HeaderBg);
  expect(styledMapComponent.type).toEqual(StyledMap);
  expect(styledHeaderComponent.type).toEqual(StyledHeader);
  expect(styledMapComponent.props).toEqual({
    lat: mockLocationRaw.location.lat,
    lng: mockLocationRaw.location.lng,
    locationError: false,
  });
  expect(styledHeaderComponent.props).toEqual({
    ip: mockLocationRaw.ip,
    isp: mockLocationRaw.isp,
    city: mockLocationRaw.location.city,
    country: mockLocationRaw.location.country,
    postalCode: mockLocationRaw.location.postalCode,
    region: mockLocationRaw.location.region,
    timezone: mockLocationRaw.location.timezone,
    setLocation: expect.any(Function),
    setLocationError: expect.any(Function),
  });
});

test(`should set locationError to false and log error`, async () => {
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
  });
  expect(mockConsoleError).toBeCalledWith(error);
});
