const {Sequelize} = require("sequelize")
require('dotenv').config(); 


const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, // Host de la base de datos
    dialect: 'mysql', // Dialecto de la base de datos
});


module.exports = db