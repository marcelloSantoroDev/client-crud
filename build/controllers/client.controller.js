"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientController {
    constructor(service) {
        this.createClient = async (req, res) => {
            const { name, email, birthdate, phone, cpf } = req.body;
            const { type, message } = await this.service.createClient({ name, email, birthdate, phone, cpf });
            if (type)
                return res.status(400).json({ message });
            res.status(201).json(message);
        };
        this.getClients = async (_req, res) => {
            const { type, message } = await this.service.getClients();
            if (type)
                return res.status(400).json({ message });
            res.status(200).json(message);
        };
        this.getClient = async (req, res) => {
            const { id } = req.params;
            const { type, message } = await this.service.getClient(+id);
            if (type)
                return res.status(400).json({ message });
            res.status(200).json(message);
        };
        this.deleteClient = async (req, res) => {
            const { id } = req.params;
            const { type, message } = await this.service.deleteClient(+id);
            if (type)
                return res.status(400).json({ message });
            res.status(204).end();
        };
        this.updateClient = async (req, res) => {
            const { id } = req.params;
            const { name, email, birthdate, phone, cpf } = req.body;
            const { type, message } = await this.service.updateClient({ name, email, birthdate, phone, cpf }, +id);
            if (type)
                return res.status(400).json({ message });
            res.status(200).json("Dados alterados.");
        };
        this.service = service;
    }
}
exports.default = ClientController;
//# sourceMappingURL=client.controller.js.map