import withMock from 'storybook-addon-mock';
import { BASE_URL, PATH } from '../services/location';
import SearchBar from './SearchBar';

export default {
  title: 'SearchBar',
  component: SearchBar,
  decorators: [withMock],
};

const Template = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  setLocation: () => {},
  setLocationError: () => {},
};
Default.parameters = {
  mockData: [
    {
      url: `${BASE_URL}/${PATH}`,
      method: 'GET',
      status: 200,
      response: (request) => ({
        data: 'Default data',
      }),
      ignoreParams: true // TODO: Work on the issue of storybook-addon-mock to avoid accessing real API without clicking true of the radio button(https://github.com/nutboltu/storybook-addon-mock/issues/78)
    },
  ],
};

export const FailedToGetData = Template.bind({});
FailedToGetData.args = {
  setLocation: () => {},
  setLocationError: () => {},
  // TODO: Better to use context and mock it with decorator? Simply passing state is easier to test...Should this be a sample for the case?(https://storybook.js.org/docs/react/writing-stories/decorators#context-for-mocking)
};
FailedToGetData.parameters = {
  mockData: [
    {
      url: `${BASE_URL}/${PATH}`,
      method: 'GET',
      status: 500,
      response: (request) => ({
        data: 'Server error',
      }),
      ignoreParams: true // TODO: Work on the issue of storybook-addon-mock to avoid accessing real API without clicking true of the radio button(https://github.com/nutboltu/storybook-addon-mock/issues/78)
    },
  ],
};

// TODO: Or use MSW(https://mswjs.io/) for better mock control