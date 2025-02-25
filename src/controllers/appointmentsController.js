const { where } = require("sequelize");
const appointmentModel = require("../models/appointmentModel")
//Crear el modelo de appointments

const getAppointments = async (req,res) =>{
    try {
        const  { page = 1, limit = 10, sort = "ASC", status } = req.query;

        const pageInt = parseInt(page)
        const limitInt = parseInt(limit)
        const offset = (pageInt - 1) * limitInt

        const filter = {}
        if (status){
            filter.status = status
        }

        const order = [["createdAt", sort.toUpperCase() === "DESC" ? "DESC" : "ASC"]];

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
        await appointmentModel.create(req.body)
        res.status(201).json("Registro exitoso")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

const deleteAppointments = async(req,res)=>{
    try {
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
        const appointment = await appointmentModel.findByPk(req.params.id)
        res.status(200).json(appointment)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const putAppointmentsId = async (req,res)=>{
    try {
        await appointmentModel.update(req.body, {
            where:{id:req.params.id}
        })
        res.status(200).json("Registro actualizado");
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {getAppointments, postAppointments, deleteAppointments, getAppointmentId, putAppointmentsId}