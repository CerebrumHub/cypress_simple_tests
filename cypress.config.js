const {defineConfig} = require("cypress");

module.exports = defineConfig({
    pageLoadTimeout: 15000,

    env: {
        firstCookieValue: "firstValue",
    },

    e2e: {
        setupNodeEvents(on, config) {
            return config;
        }
    },

    viewportWidth: 1500,
    viewportHeight: 800,
});
