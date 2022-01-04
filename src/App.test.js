import { render } from '@testing-library/react';
import App from './App';
import { Loader } from '@googlemaps/js-api-loader';
jest.mock('@googlemaps/js-api-loader');

// TODO: This should be removed after rewrite the tests to use shallow render instead
beforeEach(() => {
  const mockLoad = jest.fn();
  mockLoad.mockResolvedValue({
    maps: {
      Map: function() {},
      Marker: function() {},
    }
  });
  Loader.mockReturnValue({
    load: mockLoad
  });
});

test('renders App component', () => {
  render(<App />);
});
