const { clientService } = require('../services');

const createClient = async (req, res) => {
    const { name, email, birthdate, phone, cpf } = req.body;
    const {type, message} = await clientService.createClient({ name, email, birthdate, phone, cpf });
    if (type) return res.status(400).json({ message });
    res.status(201).json(message);
};

const getClients = async (_req, res) => {
    const { type, message } = await clientService.getClients();
    if (type) return res.status(400).json({ message });
    res.status(200).json(message);
};

const getClient = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await clientService.getClient(id);
    if (type) return res.status(400).json({ message });
    res.status(200).json(message);
};

const deleteClient = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await clientService.deleteClient(id);
    if (type) return res.status(400).json({ message });
    res.status(204).end();
};

const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email, birthdate, phone, cpf } = req.body;
    const { type, message } = await clientService.updateClient({ name, email, birthdate, phone, cpf }, id);
    if (type) return res.status(400).json({ message });
    res.status(200).json(message);
};

module.exports = {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient,
};