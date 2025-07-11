const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao.js')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferências', () => {
    let token
    beforeEach(async () => {
        // Capturar token
        token = await obterToken('julio.lima', '123456')
    });

    describe('POST /transferencias', () => {

        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$ 10,00 e menor que R$ 5000,00', async () => {
            // clonando postTransferencia (copia superficial, somente objetos com propriedades de primeiro nível - sem subniveis)
            const bodyTransferencias = { ...postTransferencias }

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(resposta.status).to.equal(201);
        });

        it('Deve retornar sucesso com 201 quando o valor da transferência for acima de R$ 5000,00 e envio de token', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 10000
            bodyTransferencias.token = '123456'

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(resposta.status).to.equal(201);
        });

        it('Deve retornar falha com 400 quando forem enviados parâmentros inválidos', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 'Doze'

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(resposta.status).to.equal(400);
        });

        it('Deve retornar falha com 401 quando enviada autenticação de token incorreta', async () => {
            const bodyTransferencias = { ...postTransferencias }
            token = '123'

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(resposta.status).to.equal(401);
        });

        it('Deve retornar falha com 401 quando o valor da transferencia for acima de R$ 5000,00 e sem envio de token', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 5005
            bodyTransferencias.token = '111'

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(resposta.status).to.equal(401)
            expect(resposta.body.error).to.equal('Autenticação necessária para transferências acima de R$5.000,00.')
        });


        it('Deve retornar falha 422 quando o Saldo for insuficiente ', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 100000

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(resposta.status).to.equal(422);

        });


        it('Deve retornar falha com 422 quando o valor da transferência for abaixo que R$10,00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(resposta.status).to.equal(422);
        });
    });

    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.limit).to.equal(10)
            expect(resposta.body.transferencias).to.have.lengthOf(10)
        });
    });

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de dados quando o id for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/8')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).to.equal(8)
            expect(resposta.body.conta_origem_id).to.equal(1)
            expect(resposta.body.conta_destino_id).to.equal(2)
            expect(resposta.body.valor).to.be.a('number')
            expect(resposta.body.valor).to.equal(15.00)
        });

        it('Deve retornar falha 401 quando token não estiver autenticado', async () => {
            token = null
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/99999')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(401)
        });

        it('Deve retornar falha 404 quando o consultar id de transferencia não existente', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/99999')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(404)
        });
    });

    // describe('PUT /transferencias/{id}', () => {
    //     it('Deve retornar sucesso 204 quando todos os dados forem enviados corretamente', () => {


    //     });
    // });

});