const db = require("../data/db")

const {DataTypes} = require ("sequelize")

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

module.exports = appointmentModel;