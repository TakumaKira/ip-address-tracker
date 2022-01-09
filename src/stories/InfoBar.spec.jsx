import { render, screen } from '@testing-library/react';
import InfoBar from './InfoBar';
import config from '../config.json';

it(`should render expected elements`, () => {
  const ip = 'ip';
  const location = 'location';
  const timezone = 'timezone';
  const isp = 'isp';
  render(<InfoBar ip={ip} location={location} timezone={timezone} isp={isp} />);
  const ipTitleElem = screen.getByText(config.labels.IP);
  expect(ipTitleElem).toBeInTheDocument();
  const ipElem = screen.getByText(ip);
  expect(ipElem).toBeInTheDocument();
  const locationTitleElem = screen.getByText(config.labels.LOCATION);
  expect(locationTitleElem).toBeInTheDocument();
  const locationElem = screen.getByText(location);
  expect(locationElem).toBeInTheDocument();
  const timezoneTitleElem = screen.getByText(config.labels.TIMEZONE);
  expect(timezoneTitleElem).toBeInTheDocument();
  const timezoneElem = screen.getByText(timezone);
  expect(timezoneElem).toBeInTheDocument();
  const ispTitleElem = screen.getByText(config.labels.ISP);
  expect(ispTitleElem).toBeInTheDocument();
  const ispElem = screen.getByText(isp);
  expect(ispElem).toBeInTheDocument();
});
