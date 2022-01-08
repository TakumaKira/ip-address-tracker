import Error from './Error';
import styled from 'styled-components';
import config from '../config.json';

const StyledError = styled(Error)`
  height: 100vh;
`;

export default {
  title: 'Map/Error',
  component: Error,
};

const Template = (args) => <StyledError {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'Error message'
};

export const IPify = Template.bind({});
IPify.args = {
  message: config.labels.IPify_SERVER_IS_NOT_AVAILABLE
};

export const Google = Template.bind({});
Google.args = {
  message: config.labels.GOOGLE_MAPS_SERVER_IS_NOT_AVAILABLE
};
