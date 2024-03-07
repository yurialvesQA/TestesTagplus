const { defineConfig } = require('cypress');
const webpack = require('@cypress/webpack-preprocessor');
const optionsWebPack = {
  webpackOptions: require('./webpack.config'),
  watchOptions: {}
};
const { Client } = require('pg');

module.exports = defineConfig({
  projectId: 'myqx6c',
  video: true,
  videoCompression: false,
  chromeWebSecurity: false,
  trashAssetsBeforeRuns: true,
  defaultCommandTimeout: 30000,
  includeShadowDom: true,
  e2e: {
    setupNodeEvents(on, config) {
      config.viewportWidth = config.env.width === 'Browser' ? 1920 : 412;
      config.viewportHeight = config.env.height === 'Browser' ? 1080 : 915;

      const specPattern = require('./cypress/config/specFiles.json');
      config.specPattern = config.env.specPattern !== undefined ? specPattern[config.env.specPattern] : specPattern['regressao'];

      const file = config.env.file ? config.env.file : 'test.json';
      config.env = require(`./cypress/env/${file}`);

      global.tempTest = {};

      on('task', {
        setTempKeyValue(object) {
          global.tempTest = {
            ...global.tempTest,
            ...object
          };
          return null;
        },
        getTempKeyValue(key) {
          return global.tempTest[key] !== undefined ? global.tempTest[key] : '';
        },
        async postgreSQL(query) {
          const client = new Client({
            user: config.env.db.user,
            password: config.env.db.password,
            host: config.env.db.host,
            database: config.env.db.database,
            ssl: config.env.db.ssl,
            port: config.env.db.port
          });
          await client.connect();
          const res = await client.query(query);
          await client.end();
          return res.rows;
        }
      });

      on('file:preprocessor', webpack(optionsWebPack));

      return config;
    }
  }
});
