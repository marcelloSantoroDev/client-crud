import clients from '../models/clients'
import emailValidation from './validations/emailValidation'

type Client = {
    name: string,
    email: string,
    birthdate: Date,
    phone: string,
    cpf: string
}

export default class ClientService {

    public createClient = async ({ name, email, birthdate, phone, cpf }: Client) => {
        const fieldsArr = [name, email, birthdate, cpf];
        const checkNull = fieldsArr.some((item) => item === "");

        if (checkNull) {
            return { type: 'error', message: 'Preencha os campos obrigatórios' };
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

    public getClients = async () => {
        const message = await clients.findAll();
        return { type: null, message };
    }

    public getClient = async (id: number) => {
        const message = await clients.findByPk(id);

        if (!message) {
            return { type: 'error', message: 'Cliente não encontrado' };
        }

        return { type: null, message };
    }

    public deleteClient = async (id: number) => {
        const message = await clients.destroy({ where: { id } });
        if (message === 0) return { type: 'error', message: 'Cliente não encontrado' };
        return { type: null, message };
    }

    public updateClient = async ({ name, email, birthdate, phone, cpf }: Client, id: number) => {
        const fieldsArr = [name, email, birthdate, cpf];
        const checkNull = fieldsArr.some((item) => item === "");

        if (checkNull) {
            return { type: 'error', message: 'Preencha os campos obrigatórios' };
        }


        const emailValid = emailValidation(email);

        if (!emailValid) {
            return { type: 'invalid_email', message: 'Formato inválido de e-mail' }
        }
        
        const [message] = await clients.update({ name, email, birthdate, phone, cpf }, { where: { id } });

        if (message === 0) return { type: 'error', message: 'Cliente não encontrado' };

        return { type: null, message: '' };
    }

}