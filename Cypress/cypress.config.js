const { defineConfig } = require("cypress");



module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280, // Set your desired width
    viewportHeight: 720, // Set your desired height
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
   
  },
});
