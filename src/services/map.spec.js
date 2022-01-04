import { Loader } from '@googlemaps/js-api-loader';
import loadMap from './map';
import locationIcon from '../stories/assets/icon-location.svg';
jest.mock('@googlemaps/js-api-loader');

let mockMapFn;
let mockMarkerFn;
let mockLoad;

beforeEach(() => {
  mockMapFn = jest.fn();
  mockMarkerFn = jest.fn();
  mockLoad = jest.fn();
  Loader.mockReturnValue({
    load: mockLoad
  });
});

it(`should call map API and resolve when network error does not occurs`, async () => {
  const map = { map: 'map' };
  mockMapFn.mockReturnValue(map);
  mockLoad.mockResolvedValue({
    maps: {
      Map: mockMapFn,
      Marker: mockMarkerFn
    }
  });
  const elem = <div></div>;
  const lat = -34.397;
  const lng = 150.644;
  const zoom = 8;
  const resolved = jest.fn();
  loadMap(elem, lat, lng, zoom, locationIcon)
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
    map,
    icon: locationIcon,
  });
  expect(resolved).toBeCalledTimes(1);
});

it(`should log error and resolve when network error occurs`, async () => {
  jest.spyOn(console, 'error');
  console.error.mockImplementation(() => {});
  const ERROR_MESSAGE = 'Network error occurs';
  mockLoad.mockRejectedValue(ERROR_MESSAGE);
  let elem = <div></div>;
  const lat = -34.397;
  const lng = 150.644;
  const zoom = 8;
  const rejected = jest.fn();
  loadMap(elem, lat, lng, zoom)
    .catch(err => rejected(err));
  expect(Loader).toBeCalledWith({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
  await new Promise(process.nextTick);
  expect(console.error).toBeCalledWith(ERROR_MESSAGE);
  expect(rejected).toBeCalledWith(ERROR_MESSAGE);
});
