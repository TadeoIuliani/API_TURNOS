const db = require("../data/db")

const {DataTypes} = require ("sequelize")
const userModel = require("./userModel")

const appointmentModel = db.define("appointment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    timestamps: true
})

// Relación: un turno tiene un usuario, y un usuario puede tener varios turnos.
appointmentModel.belongsTo(userModel, { foreignKey: 'userId' });  // Un turno tiene un usuario (usuarioId como clave foránea)
userModel.hasMany(appointmentModel, { foreignKey: 'userId' });   // Un usuario puede tener varios turnos


module.exports = appointmentModel;