// Karma is a tool to start server and test component in the real or headless browser.
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = (config) => {
  config.set(
    merge(createDefaultConfig(config), {
      frameworks: ['mocha', 'chai'],
      client: {
        mocha: { ui: 'bdd' },
      },
      files: [
        {
          pattern: config.grep ? config.grep : 'test/**/*.test.js',
          type: 'module',
        },
      ],
      esm: {
        // if you are using 'bare module imports' you will need this option
        nodeResolve: true,
      },
    }),
  );
  return config;
};
