"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = require("../models/clients");
const emailValidation_1 = require("./validations/emailValidation");
class ClientService {
    constructor() {
        this.createClient = async ({ name, email, birthdate, phone, cpf }) => {
            const fieldsArr = [name, email, birthdate, cpf];
            const checkNull = fieldsArr.some((item) => item === "");
            if (checkNull) {
                return { type: 'error', message: 'Preencha os campos obrigatórios' };
            }
            const userExists = await clients_1.default.findOne({ where: { email } });
            if (userExists) {
                return { type: 'user_exists', message: "Cliente já cadastrado" };
            }
            const emailValid = (0, emailValidation_1.default)(email);
            if (!emailValid) {
                return { type: 'invalid_email', message: 'Formato inválido de e-mail' };
            }
            const message = await clients_1.default.create({ name, email, birthdate, phone, cpf });
            return { type: null, message };
        };
        this.getClients = async () => {
            const message = await clients_1.default.findAll();
            return { type: null, message };
        };
        this.getClient = async (id) => {
            const message = await clients_1.default.findByPk(id);
            if (!message) {
                return { type: 'error', message: 'Cliente não encontrado' };
            }
            return { type: null, message };
        };
        this.deleteClient = async (id) => {
            const message = await clients_1.default.destroy({ where: { id } });
            if (message === 0)
                return { type: 'error', message: 'Cliente não encontrado' };
            return { type: null, message };
        };
        this.updateClient = async ({ name, email, birthdate, phone, cpf }, id) => {
            const fieldsArr = [name, email, birthdate, cpf];
            const checkNull = fieldsArr.some((item) => item === "");
            if (checkNull) {
                return { type: 'error', message: 'Preencha os campos obrigatórios' };
            }
            const emailValid = (0, emailValidation_1.default)(email);
            if (!emailValid) {
                return { type: 'invalid_email', message: 'Formato inválido de e-mail' };
            }
            const [message] = await clients_1.default.update({ name, email, birthdate, phone, cpf }, { where: { id } });
            if (message === 0)
                return { type: 'error', message: 'Cliente não encontrado' };
            return { type: null, message: '' };
        };
    }
}
exports.default = ClientService;
//# sourceMappingURL=client.service.js.map