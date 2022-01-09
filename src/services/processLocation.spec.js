import processLocation from './processLocation';

it(`should return processed object`, () => {
  const location = {
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
  const processedLocation = {
    ip: location.ip,
    isp: location.isp,
    city: location.location.city,
    country: location.location.country,
    lat: location.location.lat,
    lng: location.location.lng,
    postalCode: location.location.postalCode,
    region: location.location.region,
    timezone: location.location.timezone
  };
  const processed = processLocation(location);
  expect(processed).toEqual(processedLocation);
});

it(`should not throw if location object change its structure`, () => {
  const location = {
    ip: '192.212.174.101',
    as: {
      asn: 7127,
      name: 'SCE',
      route: '192.212.0.0/15',
      domain: '',
      type: ''
    },
    isp: 'Southern California Edison'
  };
  expect(() => processLocation(location)).not.toThrow();
});
