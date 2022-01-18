// import { mount } from '@cypress/react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import Info, { Data, Title } from './Info';

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

// TODO: Below doesn't work for now
// https://www.cypress.io/blog/2021/04/06/cypress-component-testing-react/
// it(`should give proper letter color`, () => {
//   const title = 'title';
//   const data = 'data';
//   mount(<Info title={title} data={data} />);
//   cy.contains(title).should('have.css', 'color', 'rgb(44, 44, 44)');
//   cy.contains(data).should('have.css', 'color', 'rgb(44, 44, 44)');
// });
