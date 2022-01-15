import { rest } from 'msw';
import GeoServiceUrlGenerator from '../services/geoServiceUrlGenerator';
import SearchBar from './SearchBar';

export default {
  title: 'SearchBar',
  component: SearchBar,
};

const Template = (args) => <SearchBar {...args} />;

const urlGenerator = new GeoServiceUrlGenerator();

export const Default = Template.bind({});
Default.args = {
  setLocation: () => {},
  setLocationError: () => {},
  setMapError: () => {},
};
Default.parameters = {
  msw: {
    handlers: [
      rest.get(`${urlGenerator.BASE_URL}/:path`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            content: "Doesn't matter"
          }),
        );
      }),
    ]
  },
};

export const FailedToGetData = Template.bind({});
FailedToGetData.args = {
  setLocation: () => {},
  setLocationError: () => {},
  setMapError: () => {},
  // TODO: Better to use context and mock it with decorator? Simply passing state is easier to test...Should this be a sample for the case?(https://storybook.js.org/docs/react/writing-stories/decorators#context-for-mocking)
};
FailedToGetData.parameters = {
  msw: {
    handlers: [
      rest.get(`${urlGenerator.BASE_URL}/:path`, (req, res, ctx) => {
        return res(
          ctx.status(503),
          ctx.json({
            message: 'Service Unavailable'
          })
        );
      }),
    ]
  },
};
