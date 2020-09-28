const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// se conecta mongoose a la database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// si existen errores se mostraran
mongoose.connection.on('error', (error) => {
  console.log(error);
});

// importar modelos de mongoose
require('../models/vacancies-model');
require('../models/users-models');