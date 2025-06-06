function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado'
  });
}

module.exports = {
  errorHandler: errorHandler,
  notFoundHandler: notFoundHandler
};
