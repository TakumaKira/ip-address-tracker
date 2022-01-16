import config from '../config.json';
import PREVIEW_LABELS from './constants/previewLabels';
import Info from './Info';

export default {
  title: 'Info',
  component: Info,
};

const Template = (args) => <Info {...args} />;

export const IP = Template.bind({});
IP.args = {
  title: config.labels.IP,
  data: PREVIEW_LABELS.ip,
};

export const Location = Template.bind({});
Location.args = {
  title: config.labels.LOCATION,
  data: PREVIEW_LABELS.location,
};

export const Timezone = Template.bind({});
Timezone.args = {
  title: config.labels.TIMEZONE,
  data: PREVIEW_LABELS.timezone,
};

export const ISP = Template.bind({});
ISP.args = {
  title: config.labels.ISP,
  data: PREVIEW_LABELS.isp,
};
