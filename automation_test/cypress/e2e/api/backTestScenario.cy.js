/// <reference types ="cypress"/>
import EnvHelper from '@helper/envHelper';

describe('Testes de APIs', () => {
    // Variáveis para armazenar dados importantes
    let valorObtido;

    // Teste GET
    it('GET: Deve retornar o valor correto', () => {
        cy.request({
            method: 'GET',
            url: 'sua_url_do_get',
            headers: {
                'Authorization': 'seu_token_de_autorizacao'
            }
        }).then((response) => {
            expect(response.status).to.eq(200); 
            valorObtido = response.body.valor; 
        });
    });

    // Teste POST
    it('POST: Deve criar um novo item', () => {
        const requestBody = {
           
        };

        cy.request({
            method: 'POST',
            url: 'sua_url_do_post',
            headers: {
                'Authorization': 'seu_token_de_autorizacao',
                'Content-Type': 'application/json'
            },
            body: requestBody
        }).then((response) => {
            expect(response.status).to.eq(201); 
        });
    });

    // Teste DELETE
    it('DELETE: Deve excluir o item corretamente', () => {
        cy.request({
            method: 'DELETE',
            url: 'sua_url_do_delete',
            headers: {
                'Authorization': 'seu_token_de_autorizacao'
            }
        }).then((response) => {
            expect(response.status).to.eq(204); 
            
        });
    });
});
