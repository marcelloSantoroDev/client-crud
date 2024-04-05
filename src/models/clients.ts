import { DataTypes, Model } from "sequelize";
import db from '.';

class Client extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare birthdate: Date;
    declare phone: string;
    declare cpf: string;
}

Client.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    phone: DataTypes.STRING,
    cpf: DataTypes.STRING
}, {
    sequelize: db,
    tableName: 'clients',
    timestamps: false,
});

export default Client;