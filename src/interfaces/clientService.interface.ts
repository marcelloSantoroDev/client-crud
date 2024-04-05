import { DataTypes } from 'sequelize';

interface IClientService {
    createClient(data: {
        name: string;
        email: string;
        birthdate: Date;
        phone: string;
        cpf: string;
    }): Promise<{ type: string | null, message: any }>;

    getClients(): Promise<{ type: string | null, message: any }>;

    getClient(id: number): Promise<{ type: string | null, message: any }>;

    deleteClient(id: number): Promise<{ type: string | null, message: any }>;

    updateClient(data: {
        name: string;
        email: string;
        birthdate: Date;
        phone: string;
        cpf: string;
    }, id: number): Promise<{ type: string | null, message: any }>;
}

export default IClientService;
