import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import config from '../config.json';

it(`should render input with placeholder`, () => {
  render(<SearchBar />);
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  expect(input.getAttribute('placeholder')).toBe(config.labels.PLACEHOLDER);
});

it(`should render button`, () => {
  render(<SearchBar />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});
