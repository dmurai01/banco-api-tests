const request = require('supertest')

const obterToken = async (usuario, senha) => {
    // Capturar token
    const respostaLogin = await request(process.env.BASE_URL)
        // supertest
        .post('/login')
        .set('Content-type', 'application/json')
        .send({
            'username': usuario,
            'senha': senha
        })
    return respostaLogin.body.token
}

module.exports = {
    obterToken
}