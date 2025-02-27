const {body, param, query, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const checkRole = (roles) => {
    return (req, res, next) => {
      // Verificar si el rol del usuario está en la lista de roles permitidos
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Acceso denegado, rol insuficiente' });
      }
      next(); 
    };
};
  

module.exports = {checkRole}