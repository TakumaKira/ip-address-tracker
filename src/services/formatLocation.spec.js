import formatLocation from './formatLocation';

it(`should return correctly formatted location`, () => {
  const city = 'Brooklyn';
  const country = 'US';
  const postalCode = '';
  const region = 'NY';
  const formatted = formatLocation(city, country, postalCode, region);
  expect(formatted).toBe('Brooklyn, NY  US');
});

it(`should return null if passed undefined`, () => {
  const city = 'Brooklyn';
  const country = 'US';
  const postalCode = '10001';
  const region = 'NY';
  expect(formatLocation(undefined, country, postalCode, region)).toBe(null);
  expect(formatLocation(city, undefined, postalCode, region)).toBe(null);
  expect(formatLocation(city, country, undefined, region)).toBe(null);
  expect(formatLocation(city, country, postalCode, undefined)).toBe(null);
});
