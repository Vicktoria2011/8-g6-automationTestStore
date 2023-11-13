import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import { login, findProduct } from '../support/helper';

it('find product', () => {

    login(user);

    cy.log('Enter "E" into filter and look for the product');
    cy.visit('/');
    cy.get('input#filter_keyword').type('E{enter}');

    findProduct('Armani Code after shave balm');
    cy.get('.productpagecart .cart').click();
  
    cy.log('Shopping cart');
    cy.get('#cart_checkout1').click();

    cy.log('Payment confirmation');
    cy.get('.table.confirm_shippment_options')
      .should('contain', user.firstName)
      .and('contain', user.lastName)
      .and('contain', user.phone);

    cy.get('.table.confirm_payment_options')
      .should('contain', user.firstName)
      .and('contain', user.lastName)
      .and('contain', user.phone);
  
    cy.log('Confirmation order')
    cy.get('#checkout_btn').click();
  
    cy.log('Message display')
    cy.get('.maintext').should('contain', 'Your Order Has Been Processed!');
  });
  