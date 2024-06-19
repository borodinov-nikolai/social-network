


describe('App E2E', ()=> {


     beforeEach(()=> {
        cy.visit('/', { failOnStatusCode: false })
     })


    it('should have', ()=> {
        cy.get('button').should('have.text', 'Поделиться')
    })
    it('try sign-in', ()=> {
        cy.get('[data-cy="open-auth-modal"]').click()
        cy.get('input#email').type('user1@gmail.com')
        cy.get('input#password').type('12345')
        cy.get('button#signInBtn').click()
    })
})