const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    indexHtmlFile: 'cypress/support/Component-Index.html', 
    
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.(mp3|wav|ogg)$/,
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      },
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});