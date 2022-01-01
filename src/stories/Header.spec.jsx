import ShallowRenderer from 'react-test-renderer/shallow';
import Header, { StyledInfoBar, StyledSearchBar } from './Header';
import Title from './Title';

it(`should render Title, SearchBar and InfoBar components`, () => {
  const ip = '192.212.174.101';
  const location = 'Brooklyn, NY 10001';
  const timezone = 'UTC -05:00';
  const isp = 'SpaceX Starlink';
  const renderer = new ShallowRenderer();
  renderer.render(<Header />);
  const { props: { children } } = renderer.getRenderOutput();
  expect(children).toEqual([
    <Title />,
    <StyledSearchBar />,
    <StyledInfoBar ip={ip} location={location} timezone={timezone} isp={isp} />,
  ]);
});
