const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../tasks.db');

const db = new sqlite3.Database(dbPath, function(err) {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

function initDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTableQuery, function(err) {
    if (err) {
      console.error('Error al crear la tabla:', err.message);
    } else {
      console.log('Tabla tasks creada o ya existe');
    }
  });
}

initDatabase();

module.exports = db;
