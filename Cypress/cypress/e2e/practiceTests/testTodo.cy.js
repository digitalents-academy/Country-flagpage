describe('todo', () => {
    beforeEach(() => {
      // Visit the initial catalogue page
      cy.visit('http://127.0.0.1:5500/index.html');
    });
    const times = 100; // Number of times to run the test

    for (let i = 0; i < times; i++) {
    it('Syö Anteron ruoan', () => {
        cy.get('.todo-input').click().type('syö Anteron lounas{enter}')
        cy.get('#items-left').should('contain', 6)
        cy.get('li').click({multiple:true})
        cy.contains('Clear Completed').click()
        cy.get('.completed').click()
        cy.get('.active').click()
        cy.get('li').should('not.be.visible')
        cy.get('.todo-input').click().type('syö myös Anteron jälkiruoka{enter}')
        cy.get('#items-left').should('contain', 1)
    })}
})