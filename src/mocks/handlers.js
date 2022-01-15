import { rest } from 'msw'
import GeoServiceUrlGenerator from '../services/geoServiceUrlGenerator';

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

  // Mock ip search for 8.8.8.8(google)
  const ipAddress = req.url.searchParams.get(urlGenerator.PARAMS.IP_ADDRESS.name);
  if (ipAddress === '8.8.8.8') {
    return res(
      ctx.status(200),
      ctx.json({
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
      }),
    );
  }

  // Mock ip search for google.com
  const domain = req.url.searchParams.get(urlGenerator.PARAMS.DOMAIN.name);
  if (domain === 'google.com') {
    return res(
      ctx.status(200),
      ctx.json({
        ip: '142.250.176.14',
        location: {
          country: 'US',
          region: 'California',
          city: 'Los Angeles',
          lat: 34.05223,
          lng: -118.24368,
          postalCode: '90001',
          timezone: '-08:00',
          geonameId: 5368361
        },
        domains: [
            '3tar.xyz',
            '7liils679b.com',
            'cobwerks.com',
            'filmstrek.cam',
            'gbbo.co.uk'
        ],
        as: {
          asn: 15169,
          name: 'GOOGLE',
          route: '142.250.0.0/15',
          domain: 'https://about.google/intl/en/',
          type: 'Content'
        },
        isp: 'Google LLC'
      })
    );
  }

  // Mock service unavailable for the rest of valid search.
  return res(
    ctx.status(503),
    ctx.json({
      message: 'Service Unavailable'
    })
  );
});

export const handlers = [
  ipSearchHandler,
]