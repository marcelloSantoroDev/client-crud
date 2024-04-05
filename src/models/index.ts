import { Sequelize } from "sequelize";
import config from '../config/config';

type Config = {
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mssql';
};

const sequelize = new Sequelize(config as Config);

export default sequelize;