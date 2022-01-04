import styled from 'styled-components';
import config from '../config.json';

const Container = styled.div`
  background-color: #e8eaed;
  color: #3c4043;
  font-size: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapError = ({ className }) =>
  <Container className={className}>
    <span>{config.labels.GOOGLE_MAPS_SERVER_IS_NOT_AVAILABLE}</span>
  </Container>;

export default MapError;