# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [GitHub](https://github.com/TakumaKira/ip-address-tracker)
- Live Site URL: [Vercel](https://ip-address-tracker-git-master-takumakira.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- [React](https://reactjs.org/) - JS library
- [Styled Components](https://styled-components.com/) - For styles
- Storybook
- MSW
- Jest
- Cypress

### What I learned

- How to use Storybook with Chromatic
- How to use styled-components
- How to use Google Maps JavaScript API
- How to use IPify API
- How to secure my API key as much as possible

### Continued development

- I still can't mock the access to Google Maps API through `@googlemaps/js-api-loader` firmly. It looks like this causes freaky Cypress E2E testing results. I need more investigation. I might be able to [contribute this](https://github.com/googlemaps/js-api-loader/blob/main/CONTRIBUTING.md).
- Mocking in Storybook with `storybook-addon-mock` didn't work well for this, so I moved to MSW. But I might be able to [contribute this](https://github.com/nutboltu/storybook-addon-mock).
- I choose passing React state for some components for the sake of testing in Storybook for this project, but it might also be good to [mocking context](https://storybook.js.org/docs/react/writing-stories/decorators#context-for-mocking).
- After installing MSW, I needed to add `GENERATE_SOURCEMAP=false` to my `react-scripts start` script to silent the error([The discussion is here](https://github.com/mswjs/msw/issues/1030)). It doesn't look preventing development for now, but I want a better solution. This involves webpack transpile.
- I wanted to try [component testing with Cypress](https://www.cypress.io/blog/2021/04/06/cypress-component-testing-react/), but it didn't work. This involves webpack transpile. I need more investigation.

### Useful resources

- [Storybook for React tutorial](https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/) - This is a great tutorial to learn how Storybook helps Component Driven Development.
- [reactjs - Is API key exposed through get request_ - Stack Overflow](https://stackoverflow.com/questions/66929478/is-api-key-exposed-through-get-request) - This gave me a general overview of securing API key.

## Author

- Website - [TakumaKira@GitHub](https://github.com/TakumaKira)
- Frontend Mentor - [@TakumaKira](https://www.frontendmentor.io/profile/TakumaKira)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
