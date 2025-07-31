const { defineConfig } = require("cypress");
const env = require("./cypress.env.json");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://connectplug.com.br",
    setupNodeEvents(on, config) {
      return config;
    }
  },
  env
});
