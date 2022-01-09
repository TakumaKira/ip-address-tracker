import Info from './Info';
import config from '../config.json';

export default {
  title: 'Info',
  component: Info,
};

const Template = (args) => <Info {...args} />;

export const IP = Template.bind({});
IP.args = {
  title: config.labels.IP,
  data: '192.212.174.101',
};

export const Location = Template.bind({});
Location.args = {
  title: config.labels.LOCATION,
  data: 'Brooklyn, NY 10001',
};

export const Timezone = Template.bind({});
Timezone.args = {
  title: config.labels.TIMEZONE,
  data: 'UTC -05:00',
};

export const ISP = Template.bind({});
ISP.args = {
  title: config.labels.ISP,
  data: 'SpaceX Starlink',
};
