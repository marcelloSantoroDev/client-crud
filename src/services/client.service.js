const { clients } = require('../models');

const createClient = async ({ name, email, birthdate, phone, cpf }) => {
    const checkNotNull = [name, email, birthdate, cpf];
    const checkNull = checkNotNull.every((item) => item !== null);
    if (!checkNull) {
        return { type: 'error', message: 'Todos os campos devem ser preenchidos' };
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
    return { type: null, message };
}

const deleteClient = async (id) => {
    const message = await clients.destroy({ where: { id } });
    return { type: null, message };
}

const updateClient = async (id, name, email, birthdate, phone, cpf) => {
    const message = await clients.update({ name, email, birthdate, phone, cpf }, { where: { id } });
    return { type: null, message };
}

module.exports = {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
};