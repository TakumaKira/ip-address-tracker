import Map from './Map';
import styled from 'styled-components';

const StyledMap = styled(Map)`
  height: 100vh;
`;

export default {
  title: 'Map/Map',
  component: Map,
};

const Template = (args) => <StyledMap {...args} />;

export const Default = Template.bind({});
Default.args = {};
