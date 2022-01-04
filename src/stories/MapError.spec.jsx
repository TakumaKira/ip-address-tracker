import { render, screen } from '@testing-library/react';
import MapError from './MapError';
import config from '../config.json';

it(`should render error message`, () => {
  render(<MapError />);
  const messageElem = screen.getByText(config.labels.GOOGLE_MAPS_SERVER_IS_NOT_AVAILABLE);
  expect(messageElem).toBeInTheDocument();
});
