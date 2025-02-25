const {body, param, query, validationResult } = require('express-validator');

const ValidateUser = [
    body("name")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
    
    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debe ser un email válido"),
    
    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    
    body("role")
        .optional()
        .isIn(["admin", "user"]).withMessage("El rol debe ser 'admin' o 'user'"),

    // Middleware para manejar errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {ValidateUser}
