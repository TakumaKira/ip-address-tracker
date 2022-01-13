import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import config from '../config.json';
import * as getLocation from '../services/location';
import SearchBar from './SearchBar';

let mockGetLocation;

beforeEach(() => {
  mockGetLocation = jest.spyOn(getLocation, 'default');
});

it(`should pass className to container`, () => {
  const className = 'a';
  const component = renderer.create(
    <SearchBar className={className} />,
  );
  let tree = component.toJSON();
  expect(tree.props.className.split(' ')).toContain(className);
});

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

it(`should display error when failed, then set location, set false to locationError and remove error message when successfully got location`, async () => {
  const mockLocation = { location: 'location' };
  mockGetLocation.mockResolvedValue(mockLocation);
  const testError = new Error('Test network error');
  mockGetLocation.mockRejectedValueOnce(testError);
  const mockSetLocation = jest.fn();
  const mockSetLocationError = jest.fn();
  const mockSetMapError = jest.fn();
  render(<SearchBar setLocation={mockSetLocation} setLocationError={mockSetLocationError} setMapError={mockSetMapError} />);
  expect(mockGetLocation).not.toBeCalled();
  expect(mockSetLocation).not.toBeCalled();
  expect(mockSetLocationError).not.toBeCalled();
  expect(mockSetMapError).not.toBeCalled();
  expect(screen.queryByText(testError.message)).not.toBeInTheDocument();
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');
  const inputValue = '123';
  fireEvent.change(input, { target: { value: inputValue } });
  await waitFor(() => {
    expect(mockGetLocation).not.toBeCalled();
  });
  await waitFor(() => {
    expect(screen.queryByText(testError.message)).not.toBeInTheDocument();
  });
  fireEvent.click(button); // First search -> Network or invalid query error
  await waitFor(() => {
    expect(mockSetMapError).toBeCalledWith(false);
  });
  await waitFor(() => {
    expect(mockGetLocation).toBeCalledTimes(1);
  });
  await waitFor(() => {
    expect(mockGetLocation).toHaveBeenLastCalledWith(inputValue);
  });
  await waitFor(() => {
    expect(mockSetLocation).not.toBeCalled();
  });
  await waitFor(() => {
    expect(mockSetLocationError).not.toBeCalled();
  });
  await waitFor(() => {
    expect(screen.getByText(testError.message)).toBeInTheDocument();
  });
  fireEvent.click(button); // Second search -> Success(query was not invalid actually)
  await waitFor(() => {
    expect(mockSetMapError).toBeCalledWith(false);
  });
  await waitFor(() => {
    expect(mockGetLocation).toBeCalledTimes(2);
  });
  await waitFor(() => {
    expect(mockGetLocation).toHaveBeenLastCalledWith(inputValue);
  });
  await waitFor(() => {
    expect(mockSetLocation).toBeCalledTimes(1);
  });
  await waitFor(() => {
    expect(mockSetLocation).toHaveBeenLastCalledWith(mockLocation);
  });
  await waitFor(() => {
    expect(mockSetLocationError).toBeCalledTimes(1);
  });
  await waitFor(() => {
    expect(mockSetLocationError).toHaveBeenLastCalledWith(false);
  });
  await waitFor(() => {
    expect(screen.queryByText(testError.message)).not.toBeInTheDocument();
  });
});

it(`should remove error message if user input something new`, async () => {
  const testError = new Error('Test invalid query error');
  mockGetLocation.mockRejectedValueOnce(testError);
  const mockSetLocation = jest.fn();
  const mockSetLocationError = jest.fn();
  const mockSetMapError = jest.fn();
  render(<SearchBar setLocation={mockSetLocation} setLocationError={mockSetLocationError} setMapError={mockSetMapError} />);
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');
  const inputValue = '123';
  fireEvent.change(input, { target: { value: inputValue } });
  expect(screen.queryByText(testError.message)).not.toBeInTheDocument();
  fireEvent.click(button);
  await waitFor(() => {
    expect(screen.getByText(testError.message)).toBeInTheDocument();
  });
  const newInputValue = '1234';
  fireEvent.change(input, { target: { value: newInputValue } });
  await waitFor(() => {
    expect(screen.queryByText(testError.message)).not.toBeInTheDocument();
  });
});

it(`should start searching when pushing enter key`, async () => {
  const mockLocation = { location: 'location' };
  mockGetLocation.mockResolvedValue(mockLocation);
  const mockSetLocation = jest.fn();
  const mockSetLocationError = jest.fn();
  const mockSetMapError = jest.fn();
  render(<SearchBar setLocation={mockSetLocation} setLocationError={mockSetLocationError} setMapError={mockSetMapError} />);
  const input = screen.getByRole('textbox');
  const inputValue = '123';
  fireEvent.change(input, { target: { value: inputValue } });
  await waitFor(() => {
    expect(mockGetLocation).not.toBeCalled();
  });
  userEvent.type(input, '{enter}');
  await waitFor(() => {
    expect(mockGetLocation).toBeCalledTimes(1);
  });
});

it(`should do nothing if input is empty and click or enter`, async () => {
  const mockSetMapError = jest.fn();
  render(<SearchBar setMapError={mockSetMapError} />);
  const input = screen.getByRole('textbox');
  const inputValue = '';
  fireEvent.change(input, { target: { value: inputValue } });
  const button = screen.getByRole('button');
  fireEvent.click(button);
  await waitFor(() => {
    expect(mockGetLocation).not.toBeCalled();
  });
});
