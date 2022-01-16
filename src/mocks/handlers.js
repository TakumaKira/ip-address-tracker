import { rest } from 'msw';
import GeoServiceUrlGenerator from '../services/geoServiceUrlGenerator';
import serviceUnavailable503 from '../mockResponseData/serviceUnavailable503.json';
import google8888Ip from '../../src/mockResponseData/google8888Ip.json';
import googleIp from '../../src/mockResponseData/googleIp.json';
import appleIp from '../../src/mockResponseData/appleIp.json';

const urlGenerator = new GeoServiceUrlGenerator();

const ipSearchHandler = rest.get(`${urlGenerator.BASE_URL}/:path`, (req, res, ctx) => {
  const apiKey = req.url.searchParams.get(urlGenerator.PARAMS.API_KEY.name);
  const { path } = req.params;

  // Deny access with incorrect path or api key.
  if (path !== urlGenerator.PATH || apiKey !== process.env.REACT_APP_IPIFY_API_KEY) {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: `Forbidden`,
      }),
    );
  }

  const ipAddress = req.url.searchParams.get(urlGenerator.PARAMS.IP_ADDRESS.name);
  const domain = req.url.searchParams.get(urlGenerator.PARAMS.DOMAIN.name);

  // Mock ip search for initial loading
  if (!ipAddress && !domain) {
    return res(
      ctx.status(200),
      ctx.json(appleIp),
    );
  }

  // Mock ip search for 8.8.8.8(google)
  if (ipAddress === '8.8.8.8') {
    return res(
      ctx.status(200),
      ctx.json(google8888Ip),
    );
  }

  // Mock ip search for google.com
  if (domain === 'google.com') {
    return res(
      ctx.status(200),
      ctx.json(googleIp),
    );
  }

  // Mock service unavailable for the rest of valid search.
  return res(
    ctx.status(503),
    ctx.json(serviceUnavailable503),
  );
});

const mapHandler = rest.get(`https://maps.googleapis.com/:path`, (req, res, ctx) => {
  return res;
});

export const handlers = [
  ipSearchHandler,
  mapHandler,
]