const database = require('../data/taskDatabase');

class TaskController {
  static getAllTasks(req, res, next) {
    let filters = {};

    if (req.query.completed) {
      if (req.query.completed === 'true') {
        filters.completed = true;
      } else if (req.query.completed === 'false') {
        filters.completed = false;
      }
    }

    if (req.query.search) {
      filters.search = req.query.search;
    }

    database.getAllTasks(filters, function(err, tasks) {
      if (err) {
        return next(err);
      }

      database.getStats(function(err, stats) {
        if (err) {
          return next(err);
        }

        res.json({
          success: true,
          message: 'Tareas obtenidas exitosamente',
          data: {
            tasks: tasks,
            stats: stats,
            filters: req.query
          }
        });
      });
    });
  }

  static getTaskById(req, res, next) {
    let id = req.params.id;

    database.getTaskById(id, function(err, task) {
      if (err) {
        return next(err);
      }

      if (task === null) {
        return res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
          errors: [{ field: 'id', message: 'No existe una tarea con el ID proporcionado' }]
        });
      }

      res.json({
        success: true,
        message: 'Tarea obtenida exitosamente',
        data: task
      });
    });
  }

  static createTask(req, res, next) {
    let data = req.body;

    database.createTask(data, function(err, newTask) {
      if (err) {
        return next(err);
      }

      res.status(201).json({
        success: true,
        message: 'Tarea creada exitosamente',
        data: newTask
      });
    });
  }

  static updateTask(req, res, next) {
    let id = req.params.id;
    let data = req.body;

    database.updateTask(id, data, function(err, updatedTask) {
      if (err) {
        return next(err);
      }

      if (updatedTask === null) {
        return res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
          errors: [{ field: 'id', message: 'No existe una tarea con el ID proporcionado' }]
        });
      }

      res.json({
        success: true,
        message: 'Tarea actualizada exitosamente',
        data: updatedTask
      });
    });
  }

  static deleteTask(req, res, next) {
    let id = req.params.id;

    database.deleteTask(id, function(err, deleted) {
      if (err) {
        return next(err);
      }

      if (deleted === false) {
        return res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
          errors: [{ field: 'id', message: 'No existe una tarea con el ID proporcionado' }]
        });
      }

      res.json({
        success: true,
        message: 'Tarea eliminada exitosamente',
        data: { id: id }
      });
    });
  }

  static getStats(req, res, next) {
    database.getStats(function(err, stats) {
      if (err) {
        return next(err);
      }

      res.json({
        success: true,
        message: 'Estadísticas obtenidas exitosamente',
        data: stats
      });
    });
  }
}

module.exports = TaskController;
