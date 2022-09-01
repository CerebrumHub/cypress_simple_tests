const {defineConfig} = require("cypress");
const AllureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
    pageLoadTimeout: 8000,

    env: {
        firstCookieValue: "firstValue",
        allure: true,
        allureAttachRequests: true,
        allureAddVideoOnPass: true
    },

    e2e: {
        setupNodeEvents(on, config) {
            AllureWriter(on, config);
            return config;
        }
    },
});
