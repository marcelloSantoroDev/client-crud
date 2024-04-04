const { clients } = require('../models');
const emailValidation = require('./validations/emailValidation');

const createClient = async ({ name, email, birthdate, phone, cpf }) => {
    const fieldsArr = [name, email, birthdate, cpf];
    const checkNull = fieldsArr.some((item) => item === "");

    if (checkNull) {
        return { type: 'error', message: 'Todos os campos devem ser preenchidos' };
    }

    const userExists = await clients.findOne({ where: { email } });

    if (userExists) {
        return { type: 'user_exists', message: "Cliente já cadastrado" }
    }

    const emailValid = emailValidation(email);

    if (!emailValid) {
        return { type: 'invalid_email', message: 'Formato inválido de e-mail' }
    }

    const message = await clients.create({ name, email, birthdate, phone, cpf });

    return { type: null, message };
}

const getClients = async () => {
    const message = await clients.findAll();
    return { type: null, message };
}

const getClient = async (id) => {
    const message = await clients.findByPk(id);

    if (!message) {
        return { type: 'error', message: 'Cliente não encontrado' };
    }

    return { type: null, message };
}

const deleteClient = async (id) => {
    const message = await clients.destroy({ where: { id } });
    if (message === 0) return { type: 'error', message: 'Cliente não encontrado' };
    return { type: null, message };
}

const updateClient = async ({ name, email, birthdate, phone, cpf }, id) => {
    const [message] = await clients.update({ name, email, birthdate, phone, cpf }, { where: { id } });
    if (message === 0) return { type: 'error', message: 'Cliente não encontrado' };
    return { type: null, message: '' };
}

module.exports = {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
};