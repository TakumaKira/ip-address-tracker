import styled from 'styled-components';
import config from '../config.json';

const PureTitle = ({ className }) => <h1 className={className}>{config.title}</h1>;

/**
 * Title UI component
 */
const StyledTitle = styled(PureTitle)`
  color: #FFFFFF;
  font-size: 32px;
`;

export default StyledTitle;