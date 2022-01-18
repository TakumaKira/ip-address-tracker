import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import Info, { Title, Data } from './Info';

it(`should render title and data`, () => {
  const title = 'title';
  const data = 'data';
  render(<Info title={title} data={data} />);
  const titleElem = screen.getByText(title);
  expect(titleElem).toBeInTheDocument();
  const dataElem = screen.getByText(data);
  expect(dataElem).toBeInTheDocument();
});

it(`should have styled title and data`, () => {
  const title = 'title';
  const data = 'data';
  const titleElem = renderer.create(<Title>{title}</Title>).toJSON();
  expect(titleElem).toHaveStyleRule('opacity', '0.5');
  const dataElem = renderer.create(<Data>{data}</Data>).toJSON();
  expect(dataElem).toHaveStyleRule('opacity', undefined);
});
