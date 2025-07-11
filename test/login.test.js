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
        it('Deve retornar sucesso 200 com token em string quando usar credenciais válidas', async () => {
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

        it('Deve retornar falha 400 quando não enviar usuário ou senha', async () => {
            const bodyLogin = {...postLogin}
            bodyLogin.senha = null

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(400)
            expect(resposta.body.error).to.equal('Usuário e senha são obrigatórios.')
        });

        it('Deve retornar falha 401 quando enviar usuário ou senha inválidos', async () => {
            const bodyLogin = {...postLogin}
            bodyLogin.senha = '123'

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(401)
            expect(resposta.body.error).to.equal('Usuário ou senha inválidos.')
        });
    });
});