const Task = require('../models/Task');

class TaskStorage {
  constructor() {
    this.tasks = [];
    this.init();
  }

  init() {
    let task1 = new Task('Completar proyecto', 'Finalizar el desarrollo del sistema de tareas');
    let task2 = new Task('Revisar código', 'Hacer code review del módulo de autenticación');
    let task3 = new Task('Documentar API', 'Crear documentación completa de los endpoints');

    task1.completed = true;

    this.tasks.push(task1);
    this.tasks.push(task2);
    this.tasks.push(task3);
  }

  getAllTasks(filters) {
    let result = [];

    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      let shouldInclude = true;

      if (filters && filters.completed !== undefined) {
        if (task.completed !== filters.completed) {
          shouldInclude = false;
        }
      }

      if (filters && filters.search) {
        let searchLower = filters.search.toLowerCase();
        if (!task.title.toLowerCase().includes(searchLower) &&
            !task.description.toLowerCase().includes(searchLower)) {
          shouldInclude = false;
        }
      }

      if (shouldInclude) {
        result.push(task.toObject());
      }
    }

    return result;
  }

  getTaskById(id) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        return this.tasks[i].toObject();
      }
    }
    return null;
  }

  createTask(data) {
    let newTask = new Task(data.title, data.description);
    this.tasks.push(newTask);
    return newTask.toObject();
  }

  updateTask(id, data) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks[i].update(data);
        return this.tasks[i].toObject();
      }
    }
    return null;
  }

  deleteTask(id) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  getStats() {
    let total = this.tasks.length;
    let completed = 0;

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].completed) {
        completed++;
      }
    }

    let pending = total - completed;
    let rate = 0;
    if (total > 0) {
      rate = Math.round((completed / total) * 100);
    }

    return {
      total: total,
      completed: completed,
      pending: pending,
      completionRate: rate
    };
  }
}

let storage = new TaskStorage();

module.exports = storage;
