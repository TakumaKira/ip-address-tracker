import withMock from 'storybook-addon-mock';
import styled from 'styled-components';
import Map from './Map';

const StyledMap = styled(Map)`
  height: 100vh;
`;

export default {
  title: 'Map/Map',
  component: Map,
  decorators: [withMock],
};

const Template = (args) => <StyledMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  lat: 37.40599,
  lng: -122.078514,
  locationError: false,
};

export const LocationError = Template.bind({});
LocationError.args = {
  lat: undefined,
  lng: undefined,
  locationError: true,
};

export const GoogleMapsError = Template.bind({});
GoogleMapsError.args = {
  lat: 37.40599,
  lng: -122.078514,
  locationError: false,
};
GoogleMapsError.parameters = {
  mockData: [
    {
      url: `https://maps.googleapis.com/maps/api/js`,
      method: 'GET',
      status: 500, // TODO: Get rejection in my code
      response: (request) => ({
        data: 'Server error',
      }),
      ignoreParams: true // TODO: Work on the issue of storybook-addon-mock to avoid accessing real API without clicking true of the radio button(https://github.com/nutboltu/storybook-addon-mock/issues/78)
    },
  ],
};

// TODO: Or use MSW(https://mswjs.io/) for better mock control