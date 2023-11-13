export function login(user){
    cy.log('Open website login page');
    cy.visit('/index.php?rt=account/login');

    cy.log('Authorize user');
    cy.get('#loginFrm_loginname').type(user.loginName);
    cy.get('#loginFrm_password').type(user.password);
    cy.get('button[type="submit"]').contains('Login').click();

    cy.get('.heading1', {timeout: 2000}).should('contain', user.firstName);
}

export function findProduct(productName) {

    cy.get('body').then( body => {
        if(body.find(`.prdocutname[title="${productName}"]`).length > 0){
            cy.get(`.prdocutname[title="${productName}"]`).click();
        }else{
            cy.contains('.pagination a', '>').click();
            findProduct(productName);
        }
    })
}