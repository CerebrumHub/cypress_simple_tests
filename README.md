# Cypress simple tests
Tests written for basic HTML, CSS and JavaScript project. For reporting Allure is configured.

## Main supported functions
Cypress tests, allure report, stub network requests with Cypress

### Requirements
NodeJS and npm installed
Current tests were developed on Ubuntu 20.04LTS using:
`node version 17.9.0` and `npm version 8.5.5`
All browsers where tests should be executed must be installed separately, Cypress only has Electron in package.

### Allure reporting requirements
(Allure binary or npm installed Allure)[https://github.com/Shelex/cypress-allure-plugin]
Java 8 - prerequisite to use Allure binary

### Setup
When both node and npm are ready, Cypress should be installed:
`npm install`

To check that Cypress is installed use:
`npm list`

## Executing tests locally
There are two main user flows with Cypress. Executing tests with CLI or by using Cypress IDE

To open Cypress IDE:
`npx cypress open`

### Executing tests with CLI commands
As was mentioned previously second option for executing tests is by using CLI commands

By default, executing tests with simply run will use Electron headless browser:
`npx cypress run`

To execute tests using CLI for example only for headless Chrome:
`npx cypress run --browser chrome`

To execute specific tests:
`npx cypress run --spec 'cypress/e2e/<your pattern here>*.js' --browser chrome`

## Reports
For reporting Allure Cypress plugin is used.

First check that allure is working and installed
`allure --version`

Next running tests will generate folder named allure-report
First time to run Allure report use
`allure generate`

And then serving can be used:
`allure serve`

Allure serve will start allure server, run allure and load results from allure-results
To close allure session:
* Close allure tab in browser
* Ctrl + C in terminal to terminate allure server session

# Development guide
## Project structure
High level project structure starting from /cypress:
* e2e/ - here all tests are stored - naming convention must be used for Cypress to find files with tests `<some_name>.cy.js`
* plugins/index.js - plugins conf file
* screenshots - here is default location of all screenshots that cypress make at runtime - by default they are every time overwritten
* video - by default cypress makes video when test fails - overwritten each next run
* fixtures/*.json - .json files with data used in stubs
* fixtures - HTML, CSS and JavaScript files used as tested code

cypress.config.js - here are all cypress configurations. They will overwrite default ones, and can also be seen in Cypress IDE

Known Cypress limitations:
* have.css is limited by default to only rgb color scheme. Hex and other formats can be added with [chai-colors assertion plugin](https://stackoverflow.com/questions/66438459/is-there-a-way-to-make-check-on-hex-color-cypress)
