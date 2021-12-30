import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import config from '../config.json';
import Title from './Title';

it(`should render title with H1 tag`, () => {
  render(<Title />);
  const titleElem = screen.getByText(config.title);
  expect(titleElem).toBeInTheDocument();
  expect(titleElem.tagName).toBe('H1');
});

it(`should have distinct color`, () => {
  const titleElem = renderer.create(<Title />).toJSON()
  expect(titleElem).toHaveStyleRule('color', '#FFFFFF')
});
