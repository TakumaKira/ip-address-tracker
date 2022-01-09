import PropTypes from 'prop-types';
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

const Header = (props) => {
  const {
    ip,
    isp,
    city,
    country,
    postalCode,
    region,
    timezone,
    setLocation,
    setLocationError,
    className
  } = props;

  return (
    <Container className={className}>
      <Title />
      <StyledSearchBar
        setLocation={setLocation}
        setLocationError={setLocationError}
      />
      <StyledInfoBar
        ip={ip}
        location={formatLocation(city, country, postalCode, region)}
        timezone={formatTimezone(timezone)}
        isp={isp}
      />
    </Container>
  )
};

Header.propTypes = {
  ip: PropTypes.string,
  isp: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  postalCode: PropTypes.string,
  region: PropTypes.string,
  timezone: PropTypes.string,
  setLocation: PropTypes.func,
  setLocationError: PropTypes.func,
  className: PropTypes.string
}

export default Header;