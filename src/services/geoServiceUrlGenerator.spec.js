import GeoServiceUrlGenerator from './geoServiceUrlGenerator';

it(`should return expected values and allow and forbid to set each value respectively`, () => {
  const urlGenerator = new GeoServiceUrlGenerator();
  expect(urlGenerator.BASE_URL).toBe('https://geo.ipify.org/api/v2');
  expect(() => urlGenerator.BASE_URL = 'other').toThrow();
  expect(urlGenerator.PATH).toBe('country,city');
  expect(() => urlGenerator.PATH = 'other').toThrow();
  expect(urlGenerator.PARAMS.API_KEY.name).toBe('apiKey');
  expect(() => urlGenerator.PARAMS.API_KEY.name = 'other').toThrow();
  expect(urlGenerator.PARAMS.API_KEY.value).toBe(process.env.REACT_APP_IPIFY_API_KEY);
  expect(() => urlGenerator.PARAMS.API_KEY.value = 'other').toThrow();
  expect(urlGenerator.PARAMS.IP_ADDRESS.name).toBe('ipAddress');
  expect(() => urlGenerator.PARAMS.IP_ADDRESS.name = 'other').toThrow();
  expect(urlGenerator.PARAMS.IP_ADDRESS.value).toBe('');
  expect(urlGenerator.getUrl()).toBe(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`);
  expect(() => urlGenerator.PARAMS.IP_ADDRESS.value = 'other').not.toThrow();
  expect(urlGenerator.getUrl()).toBe(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&ipAddress=other`);
  // Allow overwrite
  expect(() => urlGenerator.PARAMS.IP_ADDRESS.value = 'other2').not.toThrow();
  expect(urlGenerator.getUrl()).toBe(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&ipAddress=other2`);
  expect(urlGenerator.PARAMS.DOMAIN.name).toBe('domain');
  expect(() => urlGenerator.PARAMS.DOMAIN.name = 'other').toThrow();
  expect(urlGenerator.PARAMS.DOMAIN.value).toBe('');
  // Forbid to set both IP_ADDRESS.value and DOMAIN.value
  expect(() => urlGenerator.PARAMS.DOMAIN.value = 'other').toThrowError(new Error('DOMAIN cannot be set when IP_ADDRESS is not empty'));
  const urlGenerator2 = new GeoServiceUrlGenerator();
  expect(() => urlGenerator2.PARAMS.DOMAIN.value = 'other').not.toThrow();
  expect(urlGenerator2.getUrl()).toBe(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&domain=other`);
});
