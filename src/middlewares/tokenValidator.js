const {body, param, query, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 


const verifyToken = (req, res, next) =>{
    const token = req.headers['authorization']?.split(' ')[1]; //Ubico el token

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Token inválido' });
        }
        // Almacenar la información del usuario decodificada en req.user
        req.user = decoded;
        next(); 
        }
    );
}

module.exports = {verifyToken}