import InfoBar from './InfoBar';

export default {
  title: 'InfoBar',
  component: InfoBar,
};

const Template = (args) => <InfoBar {...args} />;

export const Sample = Template.bind({});
Sample.args = {
  ip: '192.212.174.101',
  location: 'Brooklyn, NY 10001',
  timezone: 'UTC -05:00',
  isp: 'SpaceX Starlink',
};

export const Empty = Template.bind({});
Empty.args = {
  ip: '',
  location: '',
  timezone: '',
  isp: '',
};
