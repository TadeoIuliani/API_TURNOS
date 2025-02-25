const { where } = require("sequelize");
const appointmentModel = require("../models/appointmentModel")
const userModel = require("../models/userModel")

const postRegister = async (req,res) =>{
    const { name, email, password, role } = req.body;
    try {
        // Verificar si el usuario ya existe
        const userExists = await userModel.findOne({ where: { email } });
        if(!userExists){
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json({message:"Registro exitoso", newUser})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {postRegister}


