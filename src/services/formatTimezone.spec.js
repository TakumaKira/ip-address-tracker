import formatTimezone from './formatTimezone';

it(`should return correctly formatted timezone`, () => {
  const timezone = '-05:00';
  const formatted = formatTimezone(timezone);
  expect(formatted).toBe('UTC -05:00');
});

it(`should return null if passed undefined`, () => {
  const timezone = undefined;
  const formatted = formatTimezone(timezone);
  expect(formatted).toBe(null);
});
