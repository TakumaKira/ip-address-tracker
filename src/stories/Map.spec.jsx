import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import config from '../config.json';
import * as MapClass from '../services/map';
import ErrorComponent from './Error';
import Map, { MapContainer, REFETCH_TIME } from './Map';

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
  const renderer = new ShallowRenderer();
  renderer.render(<Map lat={34.397} lng={-150.644} className={className} />);
  expect(mockLoadFn).toBeCalled();
  await new Promise(process.nextTick);
  const { type, props } = renderer.getRenderOutput();
  expect(type).toEqual(MapContainer);
  expect(props.className).toBe(className);
});

it(`should render MapError when network error occurs then retry fetching`, async () => {
  const realSetTimeout = global.setTimeout;
  jest.useFakeTimers();
  const mockSetTimeout = jest.spyOn(global, 'setTimeout');
  mockSetTimeout.mockImplementation(fn => realSetTimeout(() => fn()));
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
  const className = 'a';
  const renderer = new ShallowRenderer();
  renderer.render(<Map lat={34.397} lng={-150.644} className={className} />);
  expect(mockMapClass).toBeCalledTimes(1);
  expect(mockLoadFn).toBeCalledTimes(1);
  await new Promise(resolve => realSetTimeout(() => resolve())); // somehow process.nextTick doesn't work here
  const { type: type1, props: props1 } = renderer.getRenderOutput();
  expect(type1).toEqual(ErrorComponent);
  expect(props1.message).toBe(config.labels.GOOGLE_MAPS_SERVER_IS_NOT_AVAILABLE);
  expect(props1.className).toBe(className);
  expect(mockSetTimeout).toHaveBeenCalledTimes(1);
  expect(mockSetTimeout).toHaveBeenLastCalledWith(expect.any(Function), REFETCH_TIME);
  await new Promise(resolve => realSetTimeout(() => resolve())); // somehow process.nextTick doesn't work here
  expect(mockMapClass).toBeCalledTimes(2);
  expect(mockLoadFn).toBeCalledTimes(2);
  expect(mockSetTimeout).toHaveBeenCalledTimes(1);
  const { type: type2, props: props2 } = renderer.getRenderOutput();
  expect(type2).toEqual(MapContainer);
  expect(props2.className).toBe(className);
});

it(`should create mapObj then call mapObj.load only after valid lat and lng is passed`, () => {
  const mockLoadFn = jest.fn();
  mockLoadFn.mockResolvedValue();
  const mockSetGeo = jest.fn();
  const mockMapObj = {
    load: mockLoadFn,
    setGeo: mockSetGeo,
  };
  mockMapClass.mockImplementation(() => mockMapObj);
  const renderer = new ShallowRenderer();
  renderer.render(<Map lat={undefined} lng={undefined} />);
  expect(mockMapClass).not.toBeCalled();
  expect(mockSetGeo).not.toBeCalled();
  renderer.render(<Map lat={34.397} lng={-150.644} />);
  expect(mockMapClass).toBeCalledTimes(1);
  expect(mockLoadFn).toBeCalledTimes(1);
  renderer.render(<Map lat={34.398} lng={-150.644} />);
  expect(mockMapClass).toBeCalledTimes(1);
  expect(mockLoadFn).toBeCalledTimes(1);
});

it(`should render IPify server error message and not request map if locationError is true`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Map lat={undefined} lng={undefined} locationError={true} />);
  const { type: type1, props: props1 } = renderer.getRenderOutput();
  expect(type1).toEqual(ErrorComponent);
  expect(props1.message).toBe(config.labels.IPify_SERVER_IS_NOT_AVAILABLE);
  expect(mockMapClass).not.toBeCalled();
});
