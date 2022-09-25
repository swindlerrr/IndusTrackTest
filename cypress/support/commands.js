// -- This is a template command --
// Cypress.Commands.add('name', (value) => { ... })
/// <reference types="cypress" />

const {
  PageElements
} = require("../support/selectors")

const pe = new PageElements()

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


/*Cypress.Commands.add('User_Auth', (username, password) => {

  return cy.request({
    method: 'POST',
    url: 'https://onetrackui.azurewebsites.net/',
    form: true,
    body: {
       login: username,
       password: password
    }
 })

})*/



Cypress.Commands.add('STR', (email, password, searchClient, clientName) => {
  cy.get(pe.email_input).clear().type(email)
  cy.get(pe.password_input).clear().type(password)
  cy.get(pe.submitLogin_btn).should('not.be.disabled')
  cy.get(pe.loginForm).click()
  cy.loginFormValidation.call();
  cy.get(pe.invoice).click()
  cy.get(pe.new_invoice).click()    
  cy.selectFieldValidation.call();   
  cy.get(pe.select_customer).clear().type(searchClient)
  cy.agapeFieldValidation.call();
  cy.get('.customerlist > .list-group').eq(0).its('children').then((item)=>{
    cy.get('li>b').each((el)=>{
      el.text() == clientName ? cy.log('Ok!') && cy.get(el).click() : cy.log('waitForResponse')
      
    })
  })
  cy.agapeFieldValidation.call()
  cy.elementExist(pe.proceed_but)
  //cy.proceedButValidation.call();
  cy.get(pe.proceed_but).click()
  
  cy.url().should('eq', 'https://onetrackui.azurewebsites.net/invoicesTab/overview/0')
  //cy.get(pe.new_invoice, { timeout: 100 }).click
  cy.tTSFValidation.call();
  cy.get(pe.type_to_search).clear().type(searchClient)  
  
})  

Cypress.Commands.add('loginFormValidation', () => {
  cy.intercept('POST', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/GeoLocate/').as('homePageDownloaded')
  cy.wait('@homePageDownloaded').its('response.statusCode').should('eq', 200)
  //cy.get(pe.loginForm).should('be.visible')
  //cy.get(pe.email_input).should('be.visible').and('have.attr', 'placeholder', 'Username')
  //cy.get(pe.password_input).should('be.visible').and('have.attr', 'placeholder', 'Password')
  //cy.get(pe.submitLogin_btn).should('be.visible').and('have.text', 'Ready for a drive ?')
})
  Cypress.Commands.add('invoiceTabValidation', () => {
    cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/ProposalSettings/GetEmailTemplates').as('invoicePageDownloaded')
    cy.wait('@invoicePageDownloaded').its('response.statusCode').should('eq', 200)

  

})
Cypress.Commands.add('selectFieldValidation', () => {
  cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/GetAddressBooksWithPaging?filter=null&sortBy=companyName&sortDirection=asc&pageIndex=0&pageSize=20&inactiveOnly=false').as('selectPageDownloaded')
  cy.wait('@selectPageDownloaded').its('response.statusCode').should('eq', 200)

})

Cypress.Commands.add('agapeFieldValidation', () => {
  cy.intercept('POST', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/AddressBookLiveSearchExt').as('agapePageDownloaded')
  cy.wait('@agapePageDownloaded').its('response.statusCode').should('eq', 200)

})


Cypress.Commands.add('proceedButValidation', () => {
  cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/AddressBooks/GetServiceLocations/544118').as('proceedButPageDownloaded')
  cy.wait('@proceedButPageDownloaded').its('response.statusCode').should('eq', 200)

})

Cypress.Commands.add('tTSFValidation', () => {
  cy.intercept('GET', 'https://onetrackwebapi.azurewebsites.net/api/invoices/DefaultTerm').as('typeToSearch')
  cy.wait('@typeToSearch').its('response.statusCode').should('eq', 200)

})


/*Cypress.Commands.add('elementloaded', (element) => {
  cy.wait(element).should('be.visible')
})*/

Cypress.Commands.add('elementIsVisible', (element) => {
  cy.get(element).should('be.visible')
})
Cypress.Commands.add('elementExist', (element) => {
  cy.get(element).should('be.exist')
})

/*Cypress.Commands.add('navigateTo', (root) => {

  cy.get(pe.header_menu).then(() => {

    switch (root) {

      case 'Form':
        cy.contains('Create').click()
        cy.get('#camio-menu-order-add>>>').eq(0).click()
        break

      case 'Import & Optimize':
        cy.contains('Create').click()
        cy.get('#camio-menu-order-add>>>').eq(1).click()
        break
      default:
        break

    }

  })*/
/*
  cy.location().should((loc) => {
    switch (root) {
      case 'Home':
        expect(loc.pathname).to.eq('/order-add')
        break

      case 'Import & Optimize':

        expect(loc.pathname).to.eq('/orders-import')
        break
      default:
        break
    }
  })

})*/


/*Cypress.Commands.add('importOption', (optName) => {

  switch (optName) {

    case 'Select all':
      cy.get(pe.importOptions.selectAll).click()
      break

    case 'Group Orders':
      cy.get(pe.importOptions_wrap).contains(optName).click()
      break

    case 'Ungroup':
      cy.get(pe.importOptions_wrap).contains(optName).click()
      break

    case 'Validate':
      cy.get(pe.importOptions_wrap).contains(optName).click()
      cy.get(pe.importOptions.submitImport_btn).should('not.be.disabled')
      break

    case 'Delete':
      cy.get(pe.importOptions_wrap).contains(optName).click()
      break

    case 'Global map':
      cy.get(pe.importOptions_wrap).contains(optName).click()
      break

    default:
      break;
  }
})*/


