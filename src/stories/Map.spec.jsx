import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import config from '../config.json';
import * as MapClass from '../services/map';
import ErrorComponent from './Error';
import Map, { MapContainer } from './Map';

let realUseEffect;
let mockUseEffect;
let mockMapClass;
beforeEach(() => {
    realUseEffect = React.useEffect;
    mockUseEffect = React.useEffect = jest.fn();
    mockUseEffect.mockImplementation(fn => fn());
    mockMapClass = jest.spyOn(MapClass, 'default');
});
afterEach(() => {
    React.useEffect = realUseEffect;
});

it(`should render MapContainer when network error does not occur`, async () => {
  const mockLoadFn = jest.fn();
  mockLoadFn.mockResolvedValue();
  const mockSetGeo = jest.fn();
  const mockMapObj = {
    load: mockLoadFn,
    setGeo: mockSetGeo,
  };
  mockMapClass.mockImplementation(() => mockMapObj);
  const className = 'a';
  const mockSetMapError = jest.fn();
  const renderer = new ShallowRenderer();
  renderer.render(<Map lat={34.397} lng={-150.644} className={className} setMapError={mockSetMapError} />);
  expect(mockLoadFn).toBeCalled();
  await new Promise(process.nextTick);
  expect(mockSetMapError).toBeCalledWith(false);
  const { props: { children: [mapComponent, errorComponent] } } = renderer.getRenderOutput();
  expect(mapComponent.type).toEqual(MapContainer);
  expect(mapComponent.props.className).toBe(className);
  expect(errorComponent).toBe(undefined);
});

it(`should render MapError when network error occurs then retry fetching when user retried searching`, async () => {
  const mockLoadFn = jest.fn();
  const error = new Error('test network error');
  mockLoadFn.mockResolvedValue();
  mockLoadFn.mockRejectedValueOnce(error);
  const mockSetGeo = jest.fn();
  const mockMapObj = {
    load: mockLoadFn,
    setGeo: mockSetGeo,
  };
  mockMapClass.mockImplementation(() => mockMapObj);
  let lat = 34.397;
  let lng = -150.644;
  const className = 'a';
  const mockSetMapError = jest.fn();
  let mapError = false;
  mockSetMapError.mockImplementation(hasError => mapError = hasError);
  const renderer = new ShallowRenderer();
  renderer.render(<Map lat={lat} lng={lng} className={className} mapError={mapError} setMapError={mockSetMapError} />);
  expect(mockMapClass).toBeCalledTimes(1);
  expect(mockLoadFn).toBeCalledTimes(1);
  await new Promise(resolve => setTimeout(() => resolve())); // somehow process.nextTick doesn't work here
  expect(mockSetMapError).toBeCalledTimes(1);
  expect(mockSetMapError).toBeCalledWith(true);
  renderer.render(<Map lat={lat} lng={lng} className={className} mapError={mapError} setMapError={mockSetMapError} />); // Re-render because mapError is set to true
  expect(mockMapClass).toBeCalledTimes(1);
  expect(mockLoadFn).toBeCalledTimes(1);
  await new Promise(resolve => resolve()); // somehow process.nextTick doesn't work here
  expect(mockSetMapError).toBeCalledTimes(1);
  const { props: { children: [mapComponent1, errorComponent1] } } = renderer.getRenderOutput();
  expect(mapComponent1.props.style.display).toBe('none');
  expect(errorComponent1.type).toEqual(ErrorComponent);
  expect(errorComponent1.props.message).toBe(config.labels.GOOGLE_MAPS_SERVER_IS_NOT_AVAILABLE);
  expect(errorComponent1.props.className).toBe(className);
  // User retried searching, which triggers setMapError(false)
  mockSetMapError(false);
  renderer.render(<Map lat={lat} lng={lng} className={className} mapError={mapError} setMapError={mockSetMapError} />); // Re-render because mapError is set to false
  const { props: { children: [mapComponent2, errorComponent2] } } = renderer.getRenderOutput();
  expect(mapComponent2.type).toEqual(MapContainer);
  expect(mapComponent2.props.className).toBe(className);
  expect(mapComponent2.props.style.display).not.toBe('none');
  expect(errorComponent2).toBe(undefined);
});

it(`should create mapObj then call mapObj.load only after valid lat and lng is passed`, async () => {
  const mockLoadFn = jest.fn();
  mockLoadFn.mockResolvedValue();
  const mockSetGeo = jest.fn();
  const mockMapObj = {
    load: mockLoadFn,
    setGeo: mockSetGeo,
  };
  mockMapClass.mockImplementation(() => mockMapObj);
  const mockSetMapError = jest.fn();
  const renderer = new ShallowRenderer();
  renderer.render(<Map lat={undefined} lng={undefined} setMapError={mockSetMapError} />);
  expect(mockMapClass).not.toBeCalled();
  expect(mockSetGeo).not.toBeCalled();
  await new Promise(process.nextTick);
  expect(mockSetMapError).not.toBeCalled();
  renderer.render(<Map lat={34.397} lng={-150.644} setMapError={mockSetMapError} />);
  expect(mockMapClass).toBeCalledTimes(1);
  expect(mockLoadFn).toBeCalledTimes(1);
  await new Promise(process.nextTick);
  expect(mockSetMapError).toBeCalledWith(false);
  renderer.render(<Map lat={34.398} lng={-150.644} setMapError={mockSetMapError} />);
  expect(mockMapClass).toBeCalledTimes(1);
  expect(mockLoadFn).toBeCalledTimes(1);
  await new Promise(process.nextTick);
  expect(mockSetMapError).toBeCalledWith(false);
});

it(`should render IPify server error message and not request map if locationError is true`, () => {
  const className = 'a';
  const mockSetMapError = jest.fn();
  const renderer = new ShallowRenderer();
  renderer.render(<Map lat={undefined} lng={undefined} locationError={true} className={className} setMapError={mockSetMapError} />);
  const { props: { children: [mapComponent, errorComponent] } } = renderer.getRenderOutput();
  expect(mapComponent.props.style.display).toBe('none');
  expect(errorComponent.type).toEqual(ErrorComponent);
  expect(errorComponent.props.message).toBe(config.labels.IPify_SERVER_IS_NOT_AVAILABLE);
  expect(errorComponent.props.className).toBe(className);
  expect(mockMapClass).not.toBeCalled();
  expect(mockSetMapError).not.toBeCalled();
});
