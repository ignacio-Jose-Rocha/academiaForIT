const { v4: uuidv4 } = require('uuid');

class Task {
  constructor(title, description) {
    this.id = uuidv4();
    this.title = title;
    this.description = description || '';
    this.completed = false;
    this.createdAt = new Date();
  }

  update(data) {
    if (data.title) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.completed !== undefined) this.completed = data.completed;
  }

  toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt
    };
  }
}

module.exports = Task;
