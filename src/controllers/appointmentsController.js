const { where } = require("sequelize");
const appointmentModel = require("../models/appointmentModel")
const jwt = require('jsonwebtoken');

//Crear el modelo de appointments

const getAppointments = async (req,res) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);  // Asegúrate de que el secreto es correcto
        const { id: userId, role } = decoded;  // Extraemos id y role del payload del token

        const  { page = 1, limit = 10, sort = "ASC", status } = req.query;
        const pageInt = parseInt(page)
        const limitInt = parseInt(limit)
        const offset = (pageInt - 1) * limitInt

        const filter = {}
        if (status){
            filter.status = status
        }
        const order = [["createdAt", sort.toUpperCase() === "DESC" ? "DESC" : "ASC"]];

        if(role == "user"){
            filter.userId = userId
        }
        const appointments = await appointmentModel.findAll({
            where: filter, // Aquí pasamos los filtros dinámicos
            limit: limitInt,  // Límite de registros por página
            offset: offset, // Desplazamiento para la paginación
            order: order,  // Ordenar por fecha de creación (ASC o DESC)
        })
        res.status(200).json(appointments)
    } catch (error) {
        res.json({message: error.message})
    }
}

const postAppointments = async(req,res)=>{
    try {
        const { date, time } = req.body;
        const existingAppointment = await appointmentModel.findOne({
            where: {
                date, 
                time 
            }
        });
        if (existingAppointment) {
            return res.status(400).json({ message: "Ya existe un turno en este horario." });
        }

        await appointmentModel.create(req.body)
        res.status(201).json("Registro exitoso")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

const deleteAppointments = async(req,res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);  
        const { id: userId, role } = decoded;
        // Buscar el turno por ID
        const appointment = await appointmentModel.findOne({
            where: { id: req.params.id }
        });

        if (!appointment) {
            return res.status(404).json({ message: "Turno no encontrado" });
        }
        // Si el rol es 'user', validamos que el turno pertenezca a este usuario
        if (role === "user" && appointment.userId !== userId) {
            return res.status(403).json({ message: "No tienes permiso para eliminar este turno" });
        }

        await appointmentModel.destroy({
            where:{id:req.params.id}
        })
        res.status(200).json("Registro elimnado")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

const getAppointmentId =async (req,res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);  
        const { id: userId, role } = decoded;
        const appointment = await appointmentModel.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Turno no encontrado" });
        }
        // Si el rol es 'user', validamos que el turno pertenezca a este usuario
        if (role === "user" && appointment.userId !== userId) {
            return res.status(403).json({ message: "No tienes permiso para ver este turno" });
        }
        // Si pasa las validaciones, mostramos el turno
        res.status(200).json(appointment);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const putAppointmentsId = async (req,res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);  
        const { id: userId, role } = decoded;
        const appointment = await appointmentModel.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Turno no encontrado" });
        }
        // Si el rol es 'user', validamos que el turno pertenezca a este usuario
        if (role === "user" && appointment.userId !== userId) {
            return res.status(403).json({ message: "No tienes permiso para ver este turno" });
        }
        await appointmentModel.update(req.body, {
            where:{id:req.params.id}
        })
        res.status(200).json("Registro actualizado");
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {getAppointments, postAppointments, deleteAppointments, getAppointmentId, putAppointmentsId}