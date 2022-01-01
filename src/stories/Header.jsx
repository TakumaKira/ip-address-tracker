import styled from 'styled-components';
import Title from './Title';
import SearchBar from './SearchBar';
import InfoBar from './InfoBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledSearchBar = styled(SearchBar)`
  @media screen and (max-width: 1120px) {
    margin-top: 29px;
  }
  @media screen and (min-width: 1120px) {
    margin-top: 31px;
  }
`;

export const StyledInfoBar = styled(InfoBar)`
  @media screen and (max-width: 1120px) {
    margin-top: 24px;
  }
  @media screen and (min-width: 1120px) {
    margin-top: 48px;
  }
`;

const ip = '192.212.174.101';
const location = 'Brooklyn; NY 10001';
const timezone = 'UTC -05:00';
const isp = 'SpaceX Starlink';

const Header = () => (
  <Container>
    <Title />
    <StyledSearchBar />
    <StyledInfoBar ip={ip} location={location} timezone={timezone} isp={isp} />
  </Container>
);

export default Header;