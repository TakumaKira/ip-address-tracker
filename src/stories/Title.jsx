import styled from 'styled-components';
import config from '../config.json';

const PureTitle = ({ className }) =>
  <h1 className={className}>
    {config.title}
  </h1>;

/**
 * Title UI component
 */
const StyledTitle = styled(PureTitle)`
  color: #FFFFFF;
  font-weight: 500;
  @media screen and (max-width: 1120px) {
    font-size: 26px;
  }
  @media screen and (min-width: 1120px) {
    font-size: 32px;
  }
`;

export default StyledTitle;