/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!src/index.js",
    "!src/reportWebVitals.js"
  ]
};

module.exports = config;