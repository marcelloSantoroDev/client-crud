import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import clientModel from '../models/clients';
import  getClient from './mocks';
import getClients from './mocks';
import { app } from '../app';

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

        chaiHttpResponse = await chai.request(app).get('/clients');
        expect(chaiHttpResponse.body).to.be.deep.equal(getClients);
    });

    it('testa se é possível listar um cliente específico', async function () {
        sinon
            .stub(clientModel, "findOne")
            .resolves(getClient as any);

        chaiHttpResponse = await chai.request(app).get('/clients/1');
        expect(chaiHttpResponse.body).to.be.deep.equal(getClient);
    });

    it('testa erro ao listar um cliente específico', async function () {
        sinon
            .stub(clientModel, "findOne")
            .resolves(null);

        chaiHttpResponse = await chai.request(app).get('/clients/2');
        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Cliente não encontrado" });
    });
});

describe('Testa a rota POST de /clients', function () {

    let chaiHttpResponse;

    it('testa se é possível cadastrar um cliente', async function () {
        sinon
            .stub(clientModel, "create")
            .resolves(getClient as any);

        
        chaiHttpResponse = await chai.request(app).post('/clients').send({

            "name": "joao",
            "email": "joao@gmail.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": "12354678999"
        });
        expect(chaiHttpResponse.body).to.be.deep.equal(getClient);
    });

    it('testa status de cliente existente', async function () {
        sinon.restore();
        sinon
            .stub(clientModel, "create")
            .resolves({ message: "Cliente já cadastrado" } as any);

        chaiHttpResponse = await chai.request(app).post('/clients').send({

            "name": "joao",
            "email": "joao@gmail.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": "12354678999"
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        chaiHttpResponse = await chai.request(app).post('/clients').send({

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
        sinon.stub(clientModel, "create")
        .resolves({message: "Formato inválido de e-mail"} as any);

        chaiHttpResponse = await chai.request(app).post('/clients').send({

            "name": "Joao",
            "email": "joao.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": "12345679877"
        });

        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Formato inválido de e-mail" })
    })

    it('testa campos não preenchidos', async function () {
        sinon.restore();
        sinon.stub(clientModel, "create")
            .resolves({
                message: "Preencha os campos obrigatórios"} as any);

        chaiHttpResponse = await chai.request(app).post('/clients').send({

            "name": "Joao",
            "email": "joao@gmail.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": ""
        });

        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Preencha os campos obrigatórios" })
    })
});



describe('testa a rota PUT de /clients', function () {
    afterEach(function () {
        sinon.restore();
    });

    let chaiHttpResponse;

    it('testa se é possível atualizar um cliente', async function () {
        sinon
            .stub(clientModel, "update")
            .resolves("Dados alterados." as any);

        chaiHttpResponse = await chai.request(app).put('/clients/1').send(getClient);
        expect(chaiHttpResponse.body).to.be.deep.equal("Dados alterados.");
    });


    it('testa formato inválido de e-mail', async function () {
        sinon.restore();
        sinon.stub(clientModel, "update")
            .resolves({ message: "Formato inválido de e-mail" } as any);

        chaiHttpResponse = await chai.request(app).put('/clients/1').send({

            "name": "Joao",
            "email": "joao.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": "12345679877"
        });

        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Formato inválido de e-mail" })
    })

    it('testa campos não preenchidos', async function () {
        sinon.restore();
        sinon.stub(clientModel, "update")
            .resolves({
                message: "Preencha os campos obrigatórios"
            } as any);

        chaiHttpResponse = await chai.request(app).put('/clients/1').send({

            "name": "Joao",
            "email": "joao@gmail.com",
            "birthdate": "1990-01-01T02:00:00.000Z",
            "phone": "999999999",
            "cpf": ""
        });

        expect(chaiHttpResponse.body).to.be.deep.equal({ "message": "Preencha os campos obrigatórios" })
    })

});

describe('testa a rota DELETE de /clients', function () {

    let chaiHttpResponse;

    afterEach(function () {
        sinon.restore();
    });

    it('testa se é possível deletar um cliente', async function () {
        sinon
            .stub(clientModel, "destroy");

        chaiHttpResponse = await chai.request(app).delete('/clients/1');
        expect(chaiHttpResponse.status).to.be.equal(204);
    });
});
