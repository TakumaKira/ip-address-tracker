import PREVIEW_LABELS from './constants/previewLabels';
import InfoBar from './InfoBar';

export default {
  title: 'InfoBar',
  component: InfoBar,
};

const Template = (args) => <InfoBar {...args} />;

export const Sample = Template.bind({});
Sample.args = {
  ip: PREVIEW_LABELS.ip,
  location: PREVIEW_LABELS.location,
  timezone: PREVIEW_LABELS.timezone,
  isp: PREVIEW_LABELS.isp,
};

export const Empty = Template.bind({});
Empty.args = {
  ip: '',
  location: '',
  timezone: '',
  isp: '',
};
