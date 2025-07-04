const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao.js')

describe('Transferências', () => {
    describe('POST /trasnferencias', () => {
        let token
        beforeEach(async () => {
            // Capturar token
            token = await obterToken('julio.lima', '123456')

        });

        // R1 - Valor mínimo para transferência é R$ 10,00
        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$ 10,00', async () => { 
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 11,
                    'token': ''
                })
            expect(resposta.status).to.equal(201);
        });
     
        it('Deve retornar falha com 422 quando o valor da transferência for abaixo que R$10,00', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 8,
                    'token': ''
                })
            expect(resposta.status).to.equal(422);
        });
    });

});