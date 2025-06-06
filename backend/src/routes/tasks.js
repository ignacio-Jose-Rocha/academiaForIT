const express = require('express');
const TaskController = require('../controllers/taskController');
const { validate, validateTaskId } = require('../middleware/validation');

const router = express.Router();

router.get('/stats', TaskController.getStats);

router.get('/',
  validate('query', 'query'),
  TaskController.getAllTasks
);

router.get('/:id',
  validateTaskId,
  TaskController.getTaskById
);

router.post('/',
  validate('create'),
  TaskController.createTask
);

router.put('/:id',
  validateTaskId,
  validate('update'),
  TaskController.updateTask
);

router.delete('/:id',
  validateTaskId,
  TaskController.deleteTask
);

module.exports = router;
