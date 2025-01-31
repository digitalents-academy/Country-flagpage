describe('Country Details Page', () => {
    beforeEach(() => {
      // Visit the initial catalogue page
      cy.visit('http://localhost:5173');
    });
  
    it('Should search for a random country and display the correct details', () => {
      // Generate a random number for the country to select
      const randomNumber = Math.floor(Math.random() * 250);
  
      // Get the name of a random country from the displayed list
      cy.get('.country-box')
        .eq(randomNumber)
        .find('.country')
        .invoke('text')
        .then((textValue) => {
          // Log the random country name
          cy.log('Random country name:', textValue);
  
          // Encode the country name for URL use
          const encodedTextValue = encodeURIComponent(textValue.trim());
  
          // Set up intercept for the API request triggered by the search
          cy.intercept('GET', `**/v3.1/name/${encodedTextValue}**`).as('getCountryDetails');
  
          // Search for the country
          cy.get('.search-bar-text')
            .click()
            .clear() // Make sure to clear any existing text
            .type(`${textValue.trim()}{enter}`); // Type the name and press enter
  
          // Wait for the API request to be intercepted and assert the response
          cy.wait('@getCountryDetails').its('response.statusCode').should('equal', 200);
          
          // Make some additional checks to ensure the correct data is displayed
          cy.get('.flag-and-detail-container').should('be.visible');
          cy.get('.country-name').should('contain', textValue).and('be.visible').and('not.be.empty');;
          cy.get('.country-flag').should('be.visible')
          cy.get('.native-names').should('be.visible').and('not.be.empty')
          cy.get('.region').should('not.be.empty')
          cy.get('.top-level-domain').should('not.be.empty')
          cy.get('.currency-item').should('not.be.empty')
          cy.get('.languages').should('be.visible').and('not.be.empty')
          cy.get('.capital').should('not.be.empty')
      
        });
    });
  
    it('Navigate to details view when clicking on a country and go back to the catalogue', () => {
      // Generate a random number for the country to select
      const randomNumber = Math.floor(Math.random() * 250);
  
      // Click on the random country box
      cy.get('.country-box')
        .eq(randomNumber)
        .click();
  
      // Assert that the details page is displayed after clicking
      cy.get('.flag-and-detail-container').should('be.visible');
  
      // Check for some key elements in the detailed view
      cy.get('.country-name').should('not.be.empty');
      cy.get('.country-flag').should('be.visible');
      cy.get('.population').should('contain', 'Population:');
  
      // Click the back button to go back to the catalogue view
      cy.get('.back-button').should('be.visible').click();
  
      // Assert that the catalogue view is displayed again
      cy.get('.country-box', { timeout: 10000 }).should('have.length', 250).and('be.visible');
    });

    it('Tests border countries', () => {
  
        const randomNumber = Math.floor(Math.random() * 250)
        const checkForBorderCountries = () => {
          // Generate a random number to select a country
          const randomNumber = Math.floor(Math.random() * 250);
      
          // Click on the random country box
          cy.get('.country-box')
            .eq(randomNumber)
            .click();
      
          // Check if the border countries container is visible
          cy.get('.border-countries-container').should('exist').and('be.visible');
      
          // Now, check if there are any border countries
          cy.get('body').then(($body) => {
            if ($body.find('.border-countries').length > 0) {
              // If border countries exist, get the text value of the first border country
              cy.get('.border-countries')
                .eq(0)
                .invoke('text')
                .then((borderCountryName) => {
                  // Log the name of the border country
                  cy.log('Random border-country name:', borderCountryName.trim());
      
                  // Encode the border country name for the request
                  const encodedBorderCountryName = borderCountryName.trim().toLowerCase() === 'china' ? 'cn' : encodeURIComponent(borderCountryName.trim());

              // Set up intercept based on whether the border country is China or another country
              if (encodedBorderCountryName === 'cn') {
                cy.intercept('GET', '**/v3.1/name/cn*').as('getBorderCountryDetails');  // Intercept the request for China as 'cn'
              } else {
                cy.intercept('GET', `**/v3.1/name/${encodedBorderCountryName}*`).as('getBorderCountryDetails');
              }
                  // Click on the border country
                  cy.get('.border-countries')
                    .eq(0)
                    .click();
      
                  // Wait for the API request and assert the response status code
                  cy.wait('@getBorderCountryDetails').its('response.statusCode').should('equal', 200);
      
                  // Assert that the new country details page is displayed
                  cy.get('.flag-and-detail-container').should('be.visible');
      
                  // Make sure the new country name matches the clicked border country
                  cy.get('.country-name').should('contain', borderCountryName.trim());
                });
            } else {
              // If no border countries exist, click the back button and try again
              cy.get('.back-button').click();
              // Recursively call the function to repeat the process until a border country is found
              checkForBorderCountries();
            }
          });
        
        };
      
        // Start the recursive search for a country with borders
        checkForBorderCountries();
      });

          
})
  