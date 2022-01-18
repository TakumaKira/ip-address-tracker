import { apiEndPointUrls, labels, responsiveSplitWidth, title } from '../../src/config.json';
import google8888Ip from '../../src/mockResponseData/google8888Ip.json';
import serviceUnavailable503 from '../../src/mockResponseData/serviceUnavailable503.json';
import formatLocation from '../../src/services/formatLocation';
import formatTimezone from '../../src/services/formatTimezone';
import GeoServiceUrlGenerator from '../../src/services/GeoServiceUrlGenerator';

beforeEach(() => {
  process.env = Cypress.env()
  cy.visit('http://localhost:3001/')
})

it(`should show static elements`, () => {
  cy.contains(title).should('be.visible')
  cy.get('input').should('have.attr', 'placeholder', labels.PLACEHOLDER)
  cy.get('[data-cy=submit]').should('be.visible')
  cy.contains(labels.IP).should('be.visible')
  cy.contains(labels.LOCATION).should('be.visible')
  cy.contains(labels.TIMEZONE).should('be.visible')
  cy.contains(labels.ISP).should('be.visible')
});

it(`should respond to hover state`, () => {
  cy.get('[data-cy=submit]').should('have.css', 'background-color', 'rgb(43, 43, 43)')
  cy.task('activateHoverPseudo', { selector: '[data-cy=submit]' })
  cy.get('[data-cy=submit]').should('have.css', 'background-color', 'rgb(150, 150, 150)')
});

it(`should respond to window width`, () => {
  // Mobile width
  cy.viewport(responsiveSplitWidth - 1, 660)
  cy.get('[data-cy=searchBar]').should('have.css', 'width', '327px')
  cy.get('[data-cy=infoBar]').should('have.css', 'width', '327px')

  // Make sure contents of SearchBar will not overflow
  // Fail search with invalid long query -> will include 'Invalid IP or domain' message
  const invalidLongDomain = 'testtesttesttesttesttesttesttesttesttest';
  cy.get('input')
    .type(`${invalidLongDomain}{enter}`)
  cy.get('[data-cy=searchBar] > *').should($children => {
    let totalWidth = 0
    for (let i = 0; i < $children.length; i++) {
      totalWidth += $children.eq(i).outerWidth()
    }
    // eslint-disable-next-line jest/valid-expect
    expect(totalWidth).to.be.gt(327 - 1).and.lt(327 + 1)
  })

  // Fail search with long query -> will include 'Failed to get data' message
  const failLongDomain = 'failfailfailfailfailfailfailfailfailfail.com';
  // Set up mock to fail
  cy.window().then((window) => {
    const urlGenerator = new GeoServiceUrlGenerator();
    urlGenerator.PARAMS.DOMAIN = failLongDomain;
    const { worker, rest } = window.msw;
    worker.use(
      rest.get(`${urlGenerator.getUrl()}`, (req, res, ctx) => {
        return res(
          ctx.status(503),
          ctx.json(serviceUnavailable503),
        );
      }),
    );
  })
  cy.get('input')
    .type(`${failLongDomain}{enter}`)
  cy.get('[data-cy=searchBar] > *').should($children => {
    let totalWidth = 0
    for (let i = 0; i < $children.length; i++) {
      totalWidth += $children.eq(i).outerWidth()
    }
    // eslint-disable-next-line jest/valid-expect
    expect(totalWidth).to.be.gt(327 - 1).and.lt(327 + 1)
  })

  // Desktop width
  cy.viewport(responsiveSplitWidth, 660)
  cy.get('[data-cy=searchBar]').should('have.css', 'width', '555px')
  cy.get('[data-cy=infoBar]').should('have.css', 'width', '1110px')
});

it(`should show user's IP at start`, () => {
  const urlGenerator = new GeoServiceUrlGenerator();
  cy.window().then((window) => {
    const { worker, rest } = window.msw;
    worker.use(
      rest.get(`${urlGenerator.getUrl()}`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(google8888Ip),
        );
      }),
    );
  })
  cy.contains(google8888Ip.ip).should('be.visible')
  cy.contains(formatLocation(google8888Ip.location.city, google8888Ip.location.country, google8888Ip.location.postalCode, google8888Ip.location.region)).should('be.visible')
  cy.contains(formatTimezone(google8888Ip.location.timezone)).should('be.visible')
  cy.contains(google8888Ip.isp).should('be.visible')
});

it(`should show error message if failed to get user's IP/access map then remove it if user retried and success`, () => {
  const urlGenerator = new GeoServiceUrlGenerator();
  // Initial loading -> Failed to access IPify
  cy.window().then((window) => {
    const { worker, rest } = window.msw;
    worker.use(
      rest.get(`${urlGenerator.getUrl()}`, (req, res, ctx) => {
        return res(
          ctx.status(503),
          ctx.json(serviceUnavailable503),
        );
      }),
    );
  })
  cy.contains(labels.IPify_SERVER_IS_NOT_AVAILABLE).should('be.visible')
  // User retries 1st -> Failed to access IPify
  cy.get('input')
    .type(google8888Ip.ip)
  cy.get('[data-cy=submit]')
    .click()
  cy.contains(labels.FAILED_TO_GET_DATA).should('be.visible')
  // User retries 2nd -> Success to access IPify but failed to access Google Maps
  cy.window().then((window) => {
    const { worker, rest } = window.msw;
    worker.use(
      rest.get(`${urlGenerator.getUrl()}`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(google8888Ip),
        );
      }),
      rest.get(`${apiEndPointUrls.GOOGLE_MAPS}`, (req, res, ctx) => {
        return res(
          ctx.status(503),
          ctx.json(serviceUnavailable503),
        );
      }),
    );
  })
  cy.get('[data-cy=submit]')
    .click()
  cy.get(labels.IPify_SERVER_IS_NOT_AVAILABLE).should('not.exist')
  cy.contains(labels.GOOGLE_MAPS_SERVER_IS_NOT_AVAILABLE).should('be.visible')
  // User retries 3rd -> Success to access IPify and Google Maps
  cy.window().then((window) => {
    const { worker, rest } = window.msw;
    worker.use(
      rest.get(`${urlGenerator.getUrl()}`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(google8888Ip),
        );
      }),
      rest.get(`${apiEndPointUrls.GOOGLE_MAPS}`, (req, res, ctx) => {
        return res;
      }),
    );
  })
  cy.get('[data-cy=submit]')
    .click()
  cy.get(labels.IPify_SERVER_IS_NOT_AVAILABLE).should('not.exist')
  cy.get(labels.GOOGLE_MAPS_SERVER_IS_NOT_AVAILABLE).should('not.exist')
});

it(`should display adequate error message on search bar`, () => {
  cy.get('input')
    .type('test{enter}')
  cy.contains(labels.INVALID_IP_OR_DOMAIN).should('be.visible')
  cy.get('input')
    .type('a')
  cy.get(labels.INVALID_IP_OR_DOMAIN).should('not.exist')
});
