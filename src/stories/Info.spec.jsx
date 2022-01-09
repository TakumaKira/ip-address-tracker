import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import Info from './Info';

it(`should render title and data`, () => {
  const title = 'title';
  const data = 'data';
  render(<Info title={title} data={data} />);
  const titleElem = screen.getByText(title);
  expect(titleElem).toBeInTheDocument();
  const dataElem = screen.getByText(data);
  expect(dataElem).toBeInTheDocument();
});

xit(`should style title and data`, () => {
  const title = 'title';
  const data = 'data';
  const infoElem = renderer.create(<Info title={title} data={data} />).toJSON();
  // const titleElem = infoElem.children[0];
  // expect(titleElem).toHaveStyleRule('color', '#2C2C2C'); //TODO: Need a way to access styled child components
  // expect(titleElem).toHaveStyleRule('opacity', 0.5);
  // const dataElem = infoElem.children[1];
  // expect(dataElem).toHaveStyleRule('color', '#2C2C2C'); //TODO: Need a way to access styled child components
  // expect(dataElem).toHaveStyleRule('opacity', 1);
});
