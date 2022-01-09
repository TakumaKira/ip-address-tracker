import PropTypes from 'prop-types';
import styled from 'styled-components';
import config from '../config.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${config.responsiveSplitWidth - 1}px) {
    align-items: center;
    width: 279px;
    margin: 12px 24px 12px 24px;
    &:first-of-type {
      margin-top: 26px;
    }
    &:last-of-type {
      margin-bottom: 26px;
    }
  }
  @media screen and (min-width: ${config.responsiveSplitWidth}px) {
    width: 213px;
    margin: 37px 32px 37px 32px;
    position: relative;
  }
`;

const Title = styled.span`
  text-transform: uppercase;
  opacity: 0.5;
  font-weight: 700;
  @media screen and (max-width: ${config.responsiveSplitWidth - 1}px) {
    font-size: 10px;
  }
  @media screen and (min-width: ${config.responsiveSplitWidth}px) {
    font-size: 12px;
  }
`;

const Data = styled.span`
  font-weight: 500;
  @media screen and (max-width: ${config.responsiveSplitWidth - 1}px) {
    font-size: 20px;
    margin-top: 7px;
  }
  @media screen and (min-width: ${config.responsiveSplitWidth}px) {
    font-size: 26px;
    margin-top: 13px;
  }
`;

const Info = ({ title, data }) =>
  <Container>
    <Title>
      {title}
    </Title>
    <Data>
      {data}
    </Data>
  </Container>;

Info.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.string,
}

Info.defaultProps = {
  data: '',
}

export default Info;