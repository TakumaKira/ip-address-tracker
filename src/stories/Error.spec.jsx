import { render, screen } from '@testing-library/react';
import Error from './Error';

it(`should render error message`, () => {
  const message = 'Test error message'
  render(<Error message={message} />);
  const messageElem = screen.getByText(message);
  expect(messageElem).toBeInTheDocument();
});
