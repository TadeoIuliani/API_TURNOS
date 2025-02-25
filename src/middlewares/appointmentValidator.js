const {body, param, query, validationResult } = require('express-validator');

const validateGetAppointments = [
    query('page').optional().isInt({ min: 1 }).withMessage('La página debe ser un número entero mayor a 0'),
    query('limit').optional().isInt({ min: 1 }).withMessage('El límite debe ser un número entero mayor a 0'),
    query('sort').optional().isIn(['ASC', 'DESC']).withMessage('El orden debe ser "ASC" o "DESC"'),
    query('status').optional().isIn(['pendiente', 'confirmado', 'cancelado']).withMessage('Estado inválido'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  

const validateGetAppointmentId = [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validatePostAppointment = [
    body('date').isISO8601().withMessage('La fecha debe estar en formato ISO8601'),
    body('state').isIn(['pendiente', 'confirmado', 'cancelado']).withMessage('Estado inválido'),
    // body('patientId').isInt({ min: 1 }).withMessage('El ID del paciente debe ser un número entero positivo'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
];
  
const validateDeleteAppointment = [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
];

const validatePutAppointment = [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
    body('date').optional().isISO8601().withMessage('La fecha debe estar en formato ISO8601'),
    body('state').optional().isIn(['pendiente', 'confirmado', 'cancelado']).withMessage('Estado inválido'),
    // body('patientId').optional().isInt({ min: 1 }).withMessage('El ID del paciente debe ser un número entero positivo'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
];
  



module.exports = {validateGetAppointments, validateGetAppointmentId, validatePostAppointment, validateDeleteAppointment, validatePutAppointment}
  