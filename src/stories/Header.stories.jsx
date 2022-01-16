import { rest } from 'msw';
import google8888Ip from '../mockResponseData/google8888Ip.json';
import serviceUnavailable503 from '../mockResponseData/serviceUnavailable503.json';
import GeoServiceUrlGenerator from '../services/geoServiceUrlGenerator';
import processLocation from '../services/processLocation';
import Header from './Header';

export default {
  title: 'Header',
  component: Header,
};

const urlGenerator = new GeoServiceUrlGenerator();

const Template = (args) => <Header {...args} />;

const location = processLocation(google8888Ip);

export const Default = Template.bind({});
Default.args = {
  ip: location.ip,
  isp: location.isp,
  city: location.city,
  country: location.country,
  postalCode: location.postalCode,
  region: location.region,
  timezone: location.timezone,
  setLocation: () => {},
  setLocationError: () => {},
  setMapError: () => {},
};
Default.parameters = {
  msw: {
    handlers: [
      rest.get(`${urlGenerator.BASE_URL}/:path`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            content: "Doesn't matter"
          }),
        );
      }),
    ]
  },
};

export const Error = Template.bind({});
Error.args = {
  setLocation: () => {},
  setLocationError: () => {},
  setMapError: () => {},
};
Default.parameters = {
  msw: {
    handlers: [
      rest.get(`${urlGenerator.BASE_URL}/:path`, (req, res, ctx) => {
        return res(
          ctx.status(503),
          ctx.json(serviceUnavailable503),
        );
      }),
    ]
  },
};
