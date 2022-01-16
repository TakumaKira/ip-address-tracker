import { rest } from 'msw';
import styled from 'styled-components';
import serviceUnavailable503 from '../mockResponseData/serviceUnavailable503.json';
import Map from './Map';

const StyledMap = styled(Map)`
  height: 100vh;
`;

export default {
  title: 'Map/Map',
  component: Map,
};

const Template = (args) => <StyledMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  lat: 37.40599,
  lng: -122.078514,
  locationError: false,
  setMapError: () => {},
};
Default.parameters = {
  msw: {
    handlers: [
      rest.get(`https://maps.googleapis.com/:path`, (req, res, ctx) => {
        return res;
      }),
    ]
  },
};

export const LocationError = Template.bind({});
LocationError.args = {
  lat: undefined,
  lng: undefined,
  locationError: true,
  setMapError: () => {},
};
LocationError.parameters = {
  msw: {
    handlers: [
      rest.get(`https://maps.googleapis.com/:path`, (req, res, ctx) => {
        return res;
      }),
    ]
  },
};

export const GoogleMapsError = Template.bind({});
GoogleMapsError.args = {
  lat: 37.40599,
  lng: -122.078514,
  locationError: false,
  setMapError: () => {},
};
GoogleMapsError.parameters = {
  msw: {
    handlers: [
      rest.get(`https://maps.googleapis.com/:path`, (req, res, ctx) => {
        return res(
          ctx.status(503), // TODO: Somehow this mock doesn't work
          ctx.json(serviceUnavailable503),
        );
      }),
    ]
  },
};
