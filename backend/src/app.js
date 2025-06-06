const express = require('express');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/tasks');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.path);
  next();
});

app.get('/health', function(req, res) {
  res.json({
    success: true,
    message: 'Servidor funcionando correctamente',
    data: {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    }
  });
});


app.get('/', function(req, res) {
  res.json({
    success: true,
    message: 'API de Gestión de Tareas',
    data: {
      version: '1.0.0',
      endpoints: {
        tasks: '/api/tasks',
        health: '/health'
      }
    }
  });
});

app.use('/api/tasks', taskRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
