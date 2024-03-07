/// <reference types ="cypress"/>
import EnvHelper from '@helper/envHelper';


describe('Efetuar a compra de 2 produtos no e-commerce.', { tags: ['exploratory', 'smoke', 'regressao'] }, () => {
   
  
    describe('Como um consumidor eu escolho 2 itens, os coloco no carrinho e finalizo a compra', () => {
      
      it('Logando na plataforma e comprando os dois produtos', () => {
        cy.step('Dado que eu acesso o site.');
        cy.visit(EnvHelper.getValue('url'));

        cy.step('Quando eu informo meu usuaio.');
        cy.get('input[id="user-name"]').type(EnvHelper.getValue('users.customer.user_name'));

        cy.step('E eu informo minha senha.');
        cy.get('input[id="password"]').type(EnvHelper.getValue('users.customer.password'));

        cy.step('E eu clico no botão Login.');
        cy.get('input[id="login-button"]').click();

        cy.step('Então estou logado na plataforma.');
        cy.contains('div','Swag Labs').should('exist');

        cy.step('Quando eu adiciono ao carrinho o primeiro item: "Sauce Labs Backpack".');
        cy.get('button[id*="add-to-cart-sauce-labs-backpack"').click();

        cy.step('E adiciono ao carrinho o segundo item: "Sauce Labs Bike Light".');
        cy.get('button[id*="add-to-cart-sauce-labs-bike-light"').click();

        cy.step('E entro no carrinho para conferir meus itens.');
        cy.get('div[id*="shopping_cart_container"').click();
        cy.contains('span','Your Cart').should('exist');

        cy.step('Então eu inicio o checkout.');
        cy.get('button[id*="checkout"').click();
        cy.contains('span','Checkout: Your Information').should('exist');

        cy.step('E preencho meu nome');
        cy.get('input[id*="first-name"]').type(EnvHelper.getValue('users.customer.first_name'));
        cy.step('E preencho meu sobrenome');
        cy.get('input[id*="last-name"]').type(EnvHelper.getValue('users.customer.last_name'));
        cy.step('E preencho meu cep');
        cy.get('input[id*="postal-code"]').type(EnvHelper.getValue('users.customer.zip_code'));

        cy.step('E eu clico em continue.');
        cy.get('input[id*="continue"').click();

        cy.step('Então eu finalizo minha compra.');
        cy.get('button[id*="finish"').click();
        cy.contains('h2','Thank you for your order!').should('exist');
        


      });

  
    });

});