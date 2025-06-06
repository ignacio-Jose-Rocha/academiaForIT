const db = require('../database/database');
const { v4: uuidv4 } = require('uuid');

class TaskDatabase {
  getAllTasks(filters, callback) {
    let query = 'SELECT * FROM tasks';
    let params = [];
    let conditions = [];

    if (filters && filters.completed !== undefined) {
      conditions.push('completed = ?');
      params.push(filters.completed ? 1 : 0);
    }

    if (filters && filters.search) {
      conditions.push('(title LIKE ? OR description LIKE ?)');
      params.push('%' + filters.search + '%');
      params.push('%' + filters.search + '%');
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    db.all(query, params, function(err, rows) {
      if (err) {
        return callback(err, null);
      }

      let tasks = [];
      for (let i = 0; i < rows.length; i++) {
        tasks.push({
          id: rows[i].id,
          title: rows[i].title,
          description: rows[i].description,
          completed: rows[i].completed === 1,
          createdAt: new Date(rows[i].created_at)
        });
      }

      callback(null, tasks);
    });
  }

  getTaskById(id, callback) {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    
    db.get(query, [id], function(err, row) {
      if (err) {
        return callback(err, null);
      }

      if (!row) {
        return callback(null, null);
      }

      let task = {
        id: row.id,
        title: row.title,
        description: row.description,
        completed: row.completed === 1,
        createdAt: new Date(row.created_at)
      };

      callback(null, task);
    });
  }

  createTask(data, callback) {
    const id = uuidv4();
    const query = 'INSERT INTO tasks (id, title, description) VALUES (?, ?, ?)';
    
    db.run(query, [id, data.title, data.description || ''], function(err) {
      if (err) {
        return callback(err, null);
      }

      let newTask = {
        id: id,
        title: data.title,
        description: data.description || '',
        completed: false,
        createdAt: new Date()
      };

      callback(null, newTask);
    });
  }

  updateTask(id, data, callback) {
    let updates = [];
    let params = [];

    if (data.title !== undefined) {
      updates.push('title = ?');
      params.push(data.title);
    }

    if (data.description !== undefined) {
      updates.push('description = ?');
      params.push(data.description);
    }

    if (data.completed !== undefined) {
      updates.push('completed = ?');
      params.push(data.completed ? 1 : 0);
    }

    if (updates.length === 0) {
      return callback(new Error('No hay campos para actualizar'), null);
    }

    params.push(id);
    const query = 'UPDATE tasks SET ' + updates.join(', ') + ' WHERE id = ?';

    db.run(query, params, function(err) {
      if (err) {
        return callback(err, null);
      }

      if (this.changes === 0) {
        return callback(null, null);
      }

      const selectQuery = 'SELECT * FROM tasks WHERE id = ?';
      db.get(selectQuery, [id], function(err, row) {
        if (err) {
          return callback(err, null);
        }

        let task = {
          id: row.id,
          title: row.title,
          description: row.description,
          completed: row.completed === 1,
          createdAt: new Date(row.created_at)
        };

        callback(null, task);
      });
    });
  }

  deleteTask(id, callback) {
    const query = 'DELETE FROM tasks WHERE id = ?';
    
    db.run(query, [id], function(err) {
      if (err) {
        return callback(err, false);
      }

      callback(null, this.changes > 0);
    });
  }

  getStats(callback) {
    const query = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN completed = 0 THEN 1 ELSE 0 END) as pending
      FROM tasks
    `;

    db.get(query, [], function(err, row) {
      if (err) {
        return callback(err, null);
      }

      let total = row.total;
      let completed = row.completed;
      let pending = row.pending;
      let rate = 0;

      if (total > 0) {
        rate = Math.round((completed / total) * 100);
      }

      let stats = {
        total: total,
        completed: completed,
        pending: pending,
        completionRate: rate
      };

      callback(null, stats);
    });
  }
}

let database = new TaskDatabase();

module.exports = database;
