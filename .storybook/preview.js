import { initialize, mswDecorator } from 'msw-storybook-addon';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '800px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1440px',
          height: '800px',
        },
      },
    }
  },
  backgrounds: {
    default: 'light',
  },
}

// Initialize MSW
initialize({
  onUnhandledRequest: ({ method, url }) => {
    console.warn(`Unhandled ${method} request to ${url}.

      This exception has been only logged in the console, however, it's strongly recommended to resolve this error as you don't want unmocked data in Storybook stories.

      If you wish to mock an error response, please refer to this guide: https://mswjs.io/docs/recipes/mocking-error-responses
    `)
  },
});

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];
