const PATH = require('path');

module.exports = {
  resolve: {
    alias: {
      '@fixtures': PATH.resolve(__dirname, 'cypress/fixtures'),
      '@support': PATH.resolve(__dirname, 'cypress/support'),
      '@page': PATH.resolve(__dirname, 'cypress/support/page'),
      '@helper': PATH.resolve(__dirname, 'cypress/support/helper')
    }
  }
};
