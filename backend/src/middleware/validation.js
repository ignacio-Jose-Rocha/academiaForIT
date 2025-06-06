const Joi = require('joi');

const schemas = {
  create: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).allow('')
  }),

  update: Joi.object({
    title: Joi.string().min(1).max(100),
    description: Joi.string().max(500).allow(''),
    completed: Joi.boolean()
  }).min(1),

  query: Joi.object({
    completed: Joi.boolean(),
    search: Joi.string().max(100).allow('')
  })
};

function validate(schema, source) {
  if (!source) source = 'body';

  return function(req, res, next) {
    let data = req[source];
    let result = schemas[schema].validate(data);

    if (result.error) {
      let errors = [];
      for (let i = 0; i < result.error.details.length; i++) {
        errors.push({
          field: result.error.details[i].path.join('.'),
          message: result.error.details[i].message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors
      });
    }

    req[source] = result.value;
    next();
  };
}

function validateTaskId(req, res, next) {
  let id = req.params.id;

  if (!id || id.length !== 36) {
    return res.status(400).json({
      success: false,
      message: 'ID de tarea inválido',
      errors: [{ field: 'id', message: 'El ID debe ser un UUID válido' }]
    });
  }

  next();
}

module.exports = {
  validate: validate,
  validateTaskId: validateTaskId
};
