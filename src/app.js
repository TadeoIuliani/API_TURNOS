const express = require("express")
const path = require("path")
const db = require("./data/db")

require('dotenv').config();

const port = process.env.PORT
console.log('Puerto desde .env:', process.env.PORT);

const app = express()

const appointmentsRouter = require("./routes/appointmentsRouter")
const usersRouter = require("./routes/usersRouter")

app.use(express.json()) //analiza los request

app.use("/appointments", appointmentsRouter)
app.use("/user", usersRouter)

const conexionDB = async ()=>{
    try {
        await db.authenticate()
        await db.sync()
        console.log("conexion ok a la base de datos");
        
    } catch (error) {
        console.log(`hay un error y es el siguiente ${error}`);
    }
}

app.listen(port, ()=>{
    conexionDB()
    console.log(`conexion exitosa ${port}`);
})