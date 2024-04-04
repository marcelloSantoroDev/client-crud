module.exports = (sequelize, DataTypes) => {
    const clients = sequelize.define('clients', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        birthdate: DataTypes.DATE,
        phone: DataTypes.STRING,
        cpf: DataTypes.STRING
    },
    {
        timestamps: false
    });

    return clients;
}