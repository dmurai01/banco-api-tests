# banco-api-tests

## Objetivo

Este projeto tem como objetivo realizar testes automatizados na API REST do projeto **banco-api**, validando suas funcionalidades e contribuindo com a qualidade do software.

## Stacks Utilizadas

- [Node.js](https://nodejs.org/)
- [Mocha](https://mochajs.org/) — Framework de testes
- [Chai](https://www.chaijs.com/) — Biblioteca de asserções
- [SuperTest](https://github.com/ladjs/supertest) — Testes de requisições HTTP
- [Mochawesome](https://github.com/adamgruber/mochawesome) — Geração de relatórios
- [dotenv](https://github.com/motdotla/dotenv) — Gerenciamento de variáveis de ambiente

## Estrutura de Diretórios
```
banco-api-tests/
├── fixtures/ 
│ ├── postLogin.json 
│ └── postTransferencias.json 
├── helpers/ 
│ └── autenticacao.js 
├── mochawesome-report/ # Diretório gerado automaticamente com o relatório HTML dos testes
├── test/ 
│ ├── login.test.js 
│ └── transferencia.test.js
├── .env 
├── .gitignore 
├── package.json 
└── README.md
```

## Formato do arquivo `.env`

O arquivo `.env` deve conter a URL base da API a ser testada:
BASE_URL=http://localhost:3000

> Substitua o valor conforme o endereço da sua API.

## Comandos para Execução dos Testes

Instale as dependências:

```sh
npm install
```

Execute os testes automatizados:
```sh
npm test
```
O relatório dos testes será gerado na pasta mochawesome-report/ em formato HTML e JSON.

Dependências Utilizadas
Mocha: Execução dos testes automatizados.
Chai: Asserções para validação dos resultados.
SuperTest: Requisições HTTP para testar endpoints da API.
Mochawesome: Geração de relatórios detalhados dos testes.
dotenv: Carregamento de variáveis de ambiente a partir do arquivo .env.
