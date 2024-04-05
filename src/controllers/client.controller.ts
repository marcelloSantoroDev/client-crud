import { Request, Response } from "express";
import IClientService from '../interfaces/clientService.interface';

export default class ClientController {
    private service: IClientService;

    constructor(service: IClientService) {
        this.service = service;
    }

    public createClient = async (req: Request, res: Response) => {
        const { name, email, birthdate, phone, cpf } = req.body;
        const { type, message } = await this.service.createClient({ name, email, birthdate, phone, cpf });
        if (type) return res.status(400).json({ message });
        res.status(201).json(message);
    };

    public getClients = async (_req: Request, res: Response) => {
        const { type, message } = await this.service.getClients();
        if (type) return res.status(400).json({ message });
        res.status(200).json(message);
    };

    public getClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { type, message } = await this.service.getClient(+id);
        if (type) return res.status(400).json({ message });
        res.status(200).json(message);
    };

    public deleteClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { type, message } = await this.service.deleteClient(+id);
        if (type) return res.status(400).json({ message });
        res.status(204).end();
    };

    public updateClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, email, birthdate, phone, cpf } = req.body;
        const { type, message } = await this.service.updateClient({ name, email, birthdate, phone, cpf }, +id);
        if (type) return res.status(400).json({ message });
        res.status(200).json("Dados alterados.");
    };


}