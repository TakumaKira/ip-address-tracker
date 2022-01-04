import MapError from './MapError';
import styled from 'styled-components';

const StyledMapError = styled(MapError)`
  height: 100vh;
`;

export default {
  title: 'Map/MapError',
  component: MapError,
};

const Template = (args) => <StyledMapError {...args} />;

export const Default = Template.bind({});
Default.args = {};
