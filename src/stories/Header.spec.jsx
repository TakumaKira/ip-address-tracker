import ShallowRenderer from 'react-test-renderer/shallow';
import formatLocation from '../services/formatLocation';
import formatTimezone from '../services/formatTimezone';
import Header, { StyledInfoBar, StyledSearchBar } from './Header';
import Title from './Title';

it(`should render Title, SearchBar and InfoBar components`, () => {
  const ip = '192.212.174.101';
  const city = 'Brooklyn';
  const country = 'US';
  const postalCode = '10001';
  const region = 'NY';
  const timezone = 'UTC -05:00';
  const isp = 'SpaceX Starlink';
  const renderer = new ShallowRenderer();
  renderer.render(<Header
    ip={ip}
    isp={isp}
    city={city}
    country={country}
    postalCode={postalCode}
    region={region}
    timezone={timezone}
  />);
  const { props: { children } } = renderer.getRenderOutput();
  expect(children).toEqual([
    <Title />,
    <StyledSearchBar />,
    <StyledInfoBar
      ip={ip}
      location={formatLocation(city, country, postalCode, region)}
      timezone={formatTimezone(timezone)}
      isp={isp}
    />,
  ]);
});
