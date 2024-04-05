"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Client extends sequelize_1.Model {
}
Client.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    birthdate: sequelize_1.DataTypes.DATE,
    phone: sequelize_1.DataTypes.STRING,
    cpf: sequelize_1.DataTypes.STRING
}, {
    sequelize: _1.default,
    tableName: 'clients',
    timestamps: false,
});
exports.default = Client;
//# sourceMappingURL=clients.js.map