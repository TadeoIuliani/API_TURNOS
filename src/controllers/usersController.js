require('dotenv').config(); 
const { where } = require("sequelize");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require("../models/userModel")



const postRegister = async (req,res) =>{
    const { name, email, password, role } = req.body;
    try {
        // Verificar si el usuario ya existe
        const userExists = await userModel.findOne({ where: { email } });
        if(userExists){
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


const postLogin = async (req,res) =>{

    const { email, password } = req.body;
    // Buscar al usuario en la base de datos
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
        {id: user.id, role: user.role}, process.env.SECRET_KEY, { expiresIn: '2h' }  
    );
    
    res.status(201).json({token : token});
}

module.exports = {postRegister, postLogin}


