import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import clientModel from '../models/clients';
import  getClient from './mocks';
import getClients from './mocks';
import { App } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('testa a rota GET /clients', function () {
    afterEach(function () {
        sinon.restore();
    });

    let chaiHttpResponse;
    it('testa se é possível listar todos os clientes', async function () {
        sinon
            .stub(clientModel, "findAll")
            .resolves(getClients as any);

        chaiHttpResponse = await chai.request(App).get('/clients');
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(getClients);
    });

    it('testa se é possível listar um cliente específico', async function () {
        sinon
            .stub(clientModel, "findOne")
            .resolves(getClient as any);

        chaiHttpResponse = await chai.request(App).get('/clients/1');
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(getClient);
    });

    it('testa erro ao listar um cliente específico', async function () {
        sinon
            .stub(clientModel, "findOne")
            .resolves(null);

        chaiHttpResponse = await chai.request(App).get('/clients/2');
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Cliente não encontrado" });
    });
});

describe('Testa a rota POST de /clients', function () {
    it('testa se é possível cadastrar um cliente', async function () {
        sinon
            .stub(clientModel, "create")
            .resolves(getClient as any);

        const chaiHttpResponse = await chai.request(App).post('/clients').send(getClient);
        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.be.deep.equal(getClient);
    });

    it('testa status de cliente existente', async function () {
        sinon
            .stub(clientModel, "create")
            .rejects({ message: "Cliente já cadastrado" });

        const chaiHttpResponse = await chai.request(App).post('/clients').send(getClient);
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Cliente já cadastrado" });
    });
});

describe('testa a rota PUT de /clients', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('testa se é possível atualizar um cliente', async function () {
        sinon
            .stub(clientModel, "update")
            .resolves("Dados alterados." as any);

        const chaiHttpResponse = await chai.request(App).put('/clients/1').send(getClient);
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal("Dados alterados.");
    });
});

describe('testa a rota DELETE de /clients', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('testa se é possível deletar um cliente', async function () {
        sinon
            .stub(clientModel, "destroy");

        const chaiHttpResponse = await chai.request(App).delete('/clients/1');
        expect(chaiHttpResponse.status).to.be.equal(204);
    });
});
