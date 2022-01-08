import styled from 'styled-components';
import config from '../config.json';
import formatLocation from '../services/formatLocation';
import formatTimezone from '../services/formatTimezone';
import InfoBar from './InfoBar';
import SearchBar from './SearchBar';
import Title from './Title';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledSearchBar = styled(SearchBar)`
  @media screen and (max-width: ${config.responsiveSplitWidth - 1}px) {
    margin-top: 29px;
  }
  @media screen and (min-width: ${config.responsiveSplitWidth}px) {
    margin-top: 31px;
  }
`;

export const StyledInfoBar = styled(InfoBar)`
  @media screen and (max-width: ${config.responsiveSplitWidth - 1}px) {
    margin-top: 24px;
  }
  @media screen and (min-width: ${config.responsiveSplitWidth}px) {
    margin-top: 48px;
  }
`;

const Header = ({ ip, isp, city, country, postalCode, region, timezone, className }) => (
  <Container className={className}>
    <Title />
    <StyledSearchBar />
    <StyledInfoBar
      ip={ip}
      location={formatLocation(city, country, postalCode, region)}
      timezone={formatTimezone(timezone)}
      isp={isp}
    />
  </Container>
);

export default Header;