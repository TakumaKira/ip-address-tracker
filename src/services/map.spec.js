import { Loader } from '@googlemaps/js-api-loader';
import Map, { GEO_IS_NOT_NUMBERS_ERROR } from './map';
import locationIcon from '../stories/assets/icon-location.svg';
jest.mock('@googlemaps/js-api-loader');

let mockMapFn;
let mockMarkerFn;
let mockLoadFn;

beforeEach(() => {
  mockMapFn = jest.fn();
  mockMarkerFn = jest.fn();
  mockLoadFn = jest.fn();
  Loader.mockReturnValue({
    load: mockLoadFn
  });
});

it(`should call map API and resolve when network error does not occurs`, async () => {
  const mockMapObj = { map: 'map' };
  mockMapFn.mockReturnValue(mockMapObj);
  const mockGoogleObj = {
    maps: {
      Map: mockMapFn,
      Marker: mockMarkerFn
    }
  };
  mockLoadFn.mockResolvedValue(mockGoogleObj);
  const elem = <div></div>;
  const lat = -34.397;
  const lng = 150.644;
  const zoom = 8;
  const resolved = jest.fn();
  const mapObj = new Map(elem, lat, lng, zoom, locationIcon);
  mapObj.load()
    .then(() => resolved());
  expect(Loader).toBeCalledWith({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
  await new Promise(process.nextTick);
  expect(mockMapFn).toBeCalledWith(elem, {
    center: { lat, lng },
    zoom,
    disableDefaultUI: true,
  });
  expect(mockMarkerFn).toBeCalledWith({
    position: { lat, lng },
    map: mockMapObj,
    icon: locationIcon,
  });
  expect(resolved).toBeCalledTimes(1);
});

it(`should log error and resolve when network error occurs`, async () => {
  jest.spyOn(console, 'error');
  console.error.mockImplementation(() => {});
  const ERROR_MESSAGE = 'Network error occurs';
  mockLoadFn.mockRejectedValue(ERROR_MESSAGE);
  let elem = <div></div>;
  const lat = -34.397;
  const lng = 150.644;
  const zoom = 8;
  const rejected = jest.fn();
  const mapObj = new Map(elem, lat, lng, zoom);
  mapObj.load()
    .catch(err => rejected(err));
  expect(Loader).toBeCalledWith({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
  await new Promise(process.nextTick);
  expect(console.error).toBeCalledWith(ERROR_MESSAGE);
  expect(rejected).toBeCalledWith(ERROR_MESSAGE);
});

it(`should set Geo correctly`, async () => {
  const mockPanToFn = jest.fn();
  const mockMapObj = {
    panTo: mockPanToFn
  };
  mockMapFn.mockReturnValue(mockMapObj);
  const mockLatLngFn = jest.fn();
  const mockCenterObj = { center: 'center' };
  mockLatLngFn.mockReturnValue(mockCenterObj);
  const mockGoogleObj = {
    maps: {
      Map: mockMapFn,
      Marker: mockMarkerFn,
      LatLng: mockLatLngFn
    }
  };
  mockLoadFn.mockResolvedValue(mockGoogleObj);
  const mockSetMapFn = jest.fn();
  const mockMarkerObj = {
    setMap: mockSetMapFn
  };
  mockMarkerFn.mockReturnValue(mockMarkerObj);
  const elem = <div></div>;
  const lat = 0;
  const lng = 0;
  const zoom = 8;
  const mapObj = new Map(elem, lat, lng, zoom, locationIcon);
  mapObj.load();
  await new Promise(process.nextTick);
  expect(mockMarkerFn).toBeCalledWith({
    position: { lat: lat, lng: lng },
    map: mockMapObj,
    icon: locationIcon
  });
  const newLat1 = -34.397;
  const newLng1 = 150.644;
  mapObj.setGeo(newLat1, newLng1);
  expect(mockSetMapFn).toBeCalledWith(null);
  expect(mockLatLngFn).toBeCalledWith(newLat1, newLng1);
  expect(mockPanToFn).toBeCalledWith(mockCenterObj);
  expect(mockMarkerFn).toBeCalledWith({
    position: { lat: newLat1, lng: newLng1 },
    map: mockMapObj,
    icon: locationIcon
  });
  const newLat2 = 34.397;
  const newLng2 = -150.644;
  mapObj.setGeo(newLat2, newLng2);
  expect(mockSetMapFn).toBeCalledWith(null);
  expect(mockLatLngFn).toBeCalledWith(newLat2, newLng2);
  expect(mockPanToFn).toBeCalledWith(mockCenterObj);
  expect(mockMarkerFn).toBeCalledWith({
    position: { lat: newLat2, lng: newLng2 },
    map: mockMapObj,
    icon: locationIcon
  });
});

it(`should do nothing and log error if setGeo gets other than number`, async () => {
  const mockConsoleError = jest.spyOn(console, 'error');
  const mockPanToFn = jest.fn();
  const mockMapObj = {
    panTo: mockPanToFn
  };
  mockMapFn.mockReturnValue(mockMapObj);
  const mockLatLngFn = jest.fn();
  const mockCenterObj = { center: 'center' };
  mockLatLngFn.mockReturnValue(mockCenterObj);
  const mockGoogleObj = {
    maps: {
      Map: mockMapFn,
      Marker: mockMarkerFn,
      LatLng: mockLatLngFn
    }
  };
  mockLoadFn.mockResolvedValue(mockGoogleObj);
  const mockSetMapFn = jest.fn();
  const mockMarkerObj = {
    setMap: mockSetMapFn
  };
  mockMarkerFn.mockReturnValue(mockMarkerObj);
  const elem = <div></div>;
  const lat = 0;
  const lng = 0;
  const zoom = 8;
  const mapObj = new Map(elem, lat, lng, zoom, locationIcon);
  mapObj.load();
  await new Promise(process.nextTick);
  const newLat1 = 'a';
  const newLng1 = 'b';
  mapObj.setGeo(newLat1, newLng1);
  expect(mockConsoleError).toBeCalledWith(GEO_IS_NOT_NUMBERS_ERROR);
  expect(mockSetMapFn).not.toBeCalled();
  expect(mockLatLngFn).not.toBeCalled();
  expect(mockPanToFn).not.toBeCalled();
  expect(mockMarkerFn).toBeCalledTimes(1);
});

it(`should do nothing if setGeo gets same numbers as before`, async () => {
  const mockPanToFn = jest.fn();
  const mockMapObj = {
    panTo: mockPanToFn
  };
  mockMapFn.mockReturnValue(mockMapObj);
  const mockLatLngFn = jest.fn();
  const mockCenterObj = { center: 'center' };
  mockLatLngFn.mockReturnValue(mockCenterObj);
  const mockGoogleObj = {
    maps: {
      Map: mockMapFn,
      Marker: mockMarkerFn,
      LatLng: mockLatLngFn
    }
  };
  mockLoadFn.mockResolvedValue(mockGoogleObj);
  const mockSetMapFn = jest.fn();
  const mockMarkerObj = {
    setMap: mockSetMapFn
  };
  mockMarkerFn.mockReturnValue(mockMarkerObj);
  const elem = <div></div>;
  const lat = 0;
  const lng = 0;
  const zoom = 8;
  const mapObj = new Map(elem, lat, lng, zoom, locationIcon);
  mapObj.load();
  await new Promise(process.nextTick);
  mapObj.setGeo(lat, lng);
  expect(mockSetMapFn).not.toBeCalled();
  expect(mockLatLngFn).not.toBeCalled();
  expect(mockPanToFn).not.toBeCalled();
  expect(mockMarkerFn).toBeCalledTimes(1);
});
