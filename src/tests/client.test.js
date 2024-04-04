const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const clientModel = require('../models/clients');
const { getClients, getClient } = require('./mocks');


const app = require('../../src/app');

chai.use(chaiHttp);

describe('testa a rota GET /clients', async function () {
    afterEach(function () {
        sinon.restore();
    });

    let chaiHttpResponse;
    it('testa se é possível listar todos os clientes', async function () {

        sinon
            .stub(clientModel, "findAll")
            .resolves(getClients);



        chaiHttpResponse = await chai.request(app).get('/clients');
        expect(response.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(getClients);

    });
    it('testa se é possível listar um cliente específico', async function () {

        sinon
            .stub(clientModel, "findOne")
            .resolves(getClient);


        chaiHttpResponse = await chai.request(app).get('/clients/1');
        expect(response.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(getClients);

    });
    it('testa erro ao listar um cliente específico', async function () {

        sinon
            .stub(clientModel, "findOne")
            .resolves(getClient);


        chaiHttpResponse = await chai.request(app).get('/clients/2');
        expect(response.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({"message": "Cliente não encontrado"});

    })
});

describe('Testa a rota POST de /clients', async function () {
    afterEach(function () {
        sinon.restore();
    });

    it('testa se é possível cadastrar um cliente', async function () {
        sinon
            .stub(clientModel, "create")
            .resolves(getClient);

        chaiHttpResponse = await chai.request(app).post('/clients').send(getClient);
        expect(response.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.be.deep.equal(getClient);
    })
});

describe('testa a rota PUT de /clients', async function () {
    afterEach(function () {
        sinon.restore();
    });

    it('testa se é possível atualizar um cliente', async function () {
        sinon
            .stub(clientModel, "update")

        chaiHttpResponse = await chai.request(app).put('/clients/1').send(getClient);
        expect(response.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal("Dados alterados.");
    });
})

describe('testa a rota DELETE de /clients', async function () {
    afterEach(function () {
        sinon.restore();
    });

    it('testa se é possível deletar um cliente', async function () {
        sinon
            .stub(clientModel, "destroy")

        chaiHttpResponse = await chai.request(app).delete('/clients/1');
        expect(response.status).to.be.equal(204);
    })
})