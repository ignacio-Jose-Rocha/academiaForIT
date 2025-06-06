const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('Servidor ejecutándose en puerto ' + PORT);
  console.log('http://localhost:' + PORT);
});
