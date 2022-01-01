import PropTypes from 'prop-types';
import styled from 'styled-components';
import config from '../config.json';
import Info from './Info';

const Container = styled.div`
  display: flex;
  background-color: #FFFFFF;
  border-radius: 15px;
  @media screen and (max-width: 1120px) {
    flex-direction: column;
    width: 327px;
  }
  @media screen and (min-width: 1120px) {
    flex-direction: row;
    width: 1110px;
    & > *:not(:first-child)::before {
      content: "";
      width: 1px;
      background-color: #000000;
      opacity: 0.15;
      position: absolute;
      top: 6px;
      bottom: 6px;
      transform: translateX(-32px);
    }
  }
`;

const InfoBar = ({ip, location, timezone, isp}) => (
  <Container>
    <Info title={config.labels.IP} data={ip} />
    <Info title={config.labels.LOCATION} data={location} />
    <Info title={config.labels.TIMEZONE} data={timezone} />
    <Info title={config.labels.ISP} data={isp} />
  </Container>
);

InfoBar.propTypes = {
  ip: PropTypes.string,
  location: PropTypes.string,
  timezone: PropTypes.string,
  isp: PropTypes.string,
}

InfoBar.defaultProps = {
  ip: '',
  location: '',
  timezone: '',
  isp: '',
}

export default InfoBar;