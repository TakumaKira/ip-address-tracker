import SearchBar from './SearchBar';
import config from '../config.json';

export default {
  title: 'SearchBar',
  component: SearchBar,
};

const Template = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  setLocation: () => {},
  setLocationError: () => {}
};

export const FailedToGetData = Template.bind({});
FailedToGetData.args = {
  setLocation: () => {throw new Error(config.labels.FAILED_TO_GET_DATA)}
  // TODO: Better to use context and mock it with decorator?(https://storybook.js.org/docs/react/writing-stories/decorators#context-for-mocking)
  // TODO: Better to stop using real IPify API
};
