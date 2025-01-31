describe('Country-flagpage', () => {

    beforeEach(() => {
      cy.visit('localhost:5173');
    });
  

     it('Checks the number of rendered countries', () => {
      cy.get('.country-box').should('have.length', 250).and('be.visible');
    });
  

    it('Clicks on a random country and makes sure details page opens', () => {
   
      const randomCountry = Math.floor(Math.random() * 250);
  
      cy.intercept('GET', '**/v3.1/**').as('getCountryDetails');
  
      
      cy.get('.country-box')
        .eq(randomCountry)
        .click()
        .wait('@getCountryDetails').its('response.statusCode').should('equal', 200);
  
   
      cy.get('.flag-and-detail-container').should('be.visible');
    });
 
    it('Search for a country and make sure data is returned' , () => {
    const randomNumber = Math.floor(Math.random() * 250);

    cy.get('.country-box')
    .eq(randomNumber)
    .find('.country')
    .invoke('text')
    .then((textValue) =>{
        cy.log('Random country name', textValue)
        const encodedTextValue = encodeURIComponent(textValue.trim());
        cy.intercept('GET', `**/v3.1/name/${encodedTextValue}**`).as('getCountryDetails');
        cy.get('.search-bar-text')
        .click()
        .type(`${textValue}{enter}`)
        
    })

 
    cy.wait('@getCountryDetails').its('response.statusCode').should('equal', 200);
    cy.get('.flag-and-detail-container').should('be.visible');


    })
    

})