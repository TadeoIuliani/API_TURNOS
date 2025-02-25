const db = require("../data/db")

const {DataTypes} = require ("sequelize")

const userModel = db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(75),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING, // Guardará la contraseña encriptada
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("admin", "user"), // Solo puede ser "admin" o "user"
        defaultValue: "user", // Por defecto, será usuario normal
        allowNull: false
    }
},
{
    timestamps: true
})

module.exports = userModel;