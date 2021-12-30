import { render, screen } from '@testing-library/react';
import Title from './Title';
import config from '../config.json';

it(`should render title with H1 tag`, () => {
  render(<Title />);
  const titleElem = screen.getByText(config.title);
  expect(titleElem).toBeInTheDocument();
  expect(titleElem.tagName).toBe('H1');
});
