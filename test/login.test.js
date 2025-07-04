// importando biblioteca SuperTest - para fazer requisições a API
const request = require('supertest');
// importando biblioteca Chai -  para validar comparações entre resposta e valor esperado
const { expect } = require('chai');
// importando a biblioteca dotenv
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json')


// utilizando mocha para estruturar e executar os testes
describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com token em string quando usar credenciais válidas', async () => {
            const bodyLogin = {...postLogin}
            const resposta = await request(process.env.BASE_URL)
                // supertest
                .post('/login')
                .set('Content-type', 'application/json')
                .send(bodyLogin)
            // chai
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        });
    });
});