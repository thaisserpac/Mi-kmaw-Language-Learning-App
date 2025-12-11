const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
        framework: "react",
        bundler: "webpack",
        webpackConfig: require("./cypress/webpack.config.js"),
    },
  },
});
