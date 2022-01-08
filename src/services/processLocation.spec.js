import processLocation from './processLocation';

it(`should return processed object`, () => {
  const location = {
    ip: '192.212.174.101',
    location: {
      country: 'US',
      region: 'California',
      city: 'South San Gabriel',
      lat: 34.04915,
      lng: -118.09462,
      postalCode: '',
      timezone: '-08:00',
      geonameId: 5397771
    },
    as: {
      asn: 7127,
      name: 'SCE',
      route: '192.212.0.0/15',
      domain: '',
      type: ''
    },
    isp: 'Southern California Edison'
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
