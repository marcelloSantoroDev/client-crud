"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = require("sinon");
const chai = require("chai");
// @ts-ignore
const chaiHttp = require("chai-http");
const clients_1 = require("../models/clients");
const mocks_1 = require("./mocks");
const mocks_2 = require("./mocks");
const app_1 = require("../app");
chai.use(chaiHttp);
const { expect } = chai;
describe('testa a rota GET /clients', function () {
    afterEach(function () {
        sinon.restore();
    });
    let chaiHttpResponse;
    it('testa se é possível listar todos os clientes', async function () {
        sinon
            .stub(clients_1.default, "findAll")
            .resolves(mocks_2.default);
        chaiHttpResponse = await chai.request(app_1.app).get('/clients');
        expect(chaiHttpResponse.body).to.be.deep.equal(mocks_2.default);
    });
    it('testa se é possível listar um cliente específico', async function () {
        sinon
            .stub(clients_1.default, "findOne")
            .resolves(mocks_1.default);
        chaiHttpResponse = await chai.request(app_1.app).get('/clients/1');
        expect(chaiHttpResponse.body).to.be.deep.equal(mocks_1.default);
    });
    it('testa erro ao listar um cliente específico', async function () {
        sinon
            .stub(clients_1.default, "findOne")
            .resolves(null);
        chaiHttpResponse = await chai.request(app_1.app).get('/clients/2');
        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Cliente não encontrado" });
    });
});
describe('Testa a rota POST de /clients', function () {
    let chaiHttpResponse;
    it('testa se é possível cadastrar um cliente', async function () {
        sinon
            .stub(clients_1.default, "create")
            .resolves(mocks_1.default);
        chaiHttpResponse = await chai.request(app_1.app).post('/clients').send({
            "name": "joao",
            "email": "joao@gmail.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": "12354678999"
        });
        expect(chaiHttpResponse.body).to.be.deep.equal(mocks_1.default);
    });
    it('testa status de cliente existente', async function () {
        sinon.restore();
        sinon
            .stub(clients_1.default, "create")
            .resolves({ message: "Cliente já cadastrado" });
        chaiHttpResponse = await chai.request(app_1.app).post('/clients').send({
            "name": "joao",
            "email": "joao@gmail.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": "12354678999"
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        chaiHttpResponse = await chai.request(app_1.app).post('/clients').send({
            "name": "joao",
            "email": "joao@gmail.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": "12354678999"
        });
        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Cliente já cadastrado" });
    });
    it('testa formato inválido de e-mail', async function () {
        sinon.restore();
        sinon.stub(clients_1.default, "create")
            .resolves({ message: "Formato inválido de e-mail" });
        chaiHttpResponse = await chai.request(app_1.app).post('/clients').send({
            "name": "Joao",
            "email": "joao.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": "12345679877"
        });
        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Formato inválido de e-mail" });
    });
    it('testa campos não preenchidos', async function () {
        sinon.restore();
        sinon.stub(clients_1.default, "create")
            .resolves({
            message: "Preencha os campos obrigatórios"
        });
        chaiHttpResponse = await chai.request(app_1.app).post('/clients').send({
            "name": "Joao",
            "email": "joao@gmail.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": ""
        });
        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Preencha os campos obrigatórios" });
    });
});
describe('testa a rota PUT de /clients', function () {
    afterEach(function () {
        sinon.restore();
    });
    let chaiHttpResponse;
    it('testa se é possível atualizar um cliente', async function () {
        sinon
            .stub(clients_1.default, "update")
            .resolves("Dados alterados.");
        chaiHttpResponse = await chai.request(app_1.app).put('/clients/1').send(mocks_1.default);
        expect(chaiHttpResponse.body).to.be.deep.equal("Dados alterados.");
    });
    it('testa formato inválido de e-mail', async function () {
        sinon.restore();
        sinon.stub(clients_1.default, "update")
            .resolves({ message: "Formato inválido de e-mail" });
        chaiHttpResponse = await chai.request(app_1.app).put('/clients/1').send({
            "name": "Joao",
            "email": "joao.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": "12345679877"
        });
        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Formato inválido de e-mail" });
    });
    it('testa campos não preenchidos', async function () {
        sinon.restore();
        sinon.stub(clients_1.default, "update")
            .resolves({
            message: "Preencha os campos obrigatórios"
        });
        chaiHttpResponse = await chai.request(app_1.app).put('/clients/1').send({
            "name": "Joao",
            "email": "joao@gmail.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": ""
        });
        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Preencha os campos obrigatórios" });
    });
});
describe('testa a rota DELETE de /clients', function () {
    let chaiHttpResponse;
    afterEach(function () {
        sinon.restore();
    });
    it('testa se é possível deletar um cliente', async function () {
        sinon
            .stub(clients_1.default, "destroy");
        chaiHttpResponse = await chai.request(app_1.app).delete('/clients/1');
        expect(chaiHttpResponse.status).to.be.equal(204);
    });
});
//# sourceMappingURL=client.test.js.map