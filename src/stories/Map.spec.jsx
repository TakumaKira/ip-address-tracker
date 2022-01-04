import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import * as loadMap from '../services/map';
import Map, { MapContainer } from './Map';
import MapError from './MapError';

let realUseEffect;
let mockUseEffect;
let mockLoadMap;
beforeEach(() => {
    realUseEffect = React.useEffect;
    mockUseEffect = React.useEffect = jest.fn();
    mockUseEffect.mockImplementation(fn => fn());
    mockLoadMap = jest.spyOn(loadMap, 'default');
});
afterEach(() => {
    React.useEffect = realUseEffect;
});

it(`should render MapContainer when network error does not occur`, async () => {
  mockLoadMap.mockResolvedValue();
  const className = 'a';
  const renderer = new ShallowRenderer();
  renderer.render(<Map className={className} />);
  expect(mockLoadMap).toBeCalled();
  await new Promise(process.nextTick);
  const { type, props } = renderer.getRenderOutput();
  expect(type).toEqual(MapContainer);
  expect(props.className).toBe(className);
});

it(`should render MapError when network error occurs`, async () => {
  mockLoadMap.mockRejectedValue('test error');
  const className = 'a';
  const renderer = new ShallowRenderer();
  renderer.render(<Map className={className} />);
  expect(mockLoadMap).toBeCalled();
  await new Promise(resolve => resolve()); // somehow process.nextTick doesn't work here
  const { type, props } = renderer.getRenderOutput();
  expect(type).toBe(MapError);
  expect(props.className).toBe(className);
});
