import google8888Ip from '../../src/mockResponseData/google8888Ip.json';
import serviceUnavailable503 from '../../src/mockResponseData/serviceUnavailable503.json';
import GeoServiceUrlGenerator from '../../src/services/GeoServiceUrlGenerator';

beforeEach(() => {
  process.env = Cypress.env()
  cy.visit('http://localhost:3000/')
})

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
});

it(`should show error if failed to get IP`, () => {
  const urlGenerator = new GeoServiceUrlGenerator();
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
});
