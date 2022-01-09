import axios from 'axios';
import { get } from './http';

let mockGet;

beforeEach(() => {
  mockGet = jest.spyOn(axios, 'get');
});

it(`should return resolved data when success`, async () => {
  const data = { a: 'b' };
  mockGet.mockResolvedValue({ data });
  await expect(get('url')).resolves.toEqual(data);
});

it(`should return rejected error when failed`, async () => {
  const error = new Error('test error');
  mockGet.mockRejectedValue(error);
  await expect(get('url')).rejects.toEqual(error);
});
