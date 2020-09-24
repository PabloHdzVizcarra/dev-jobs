const mongoose = require('mongoose');
require('./config/db');

const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
const router = require("./routes/index");
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config({ path: 'variables.env' });

// habilitar handlebars como template engine
app.engine('handlebars',
  exphbs({
    defaultLayout: 'layout',
    // los helpers es una forma en la que comunicas script en handlebars antes de su salida
    helpers: require('./helpers/handlebars')
  })
);

// habilitar handlebars
app.set('view engine', 'handlebars');

// add folder static files
app.use(express.static((path.join(__dirname, 'public'))));

// habilitamos las sesiones
app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  KEY: process.env.KEY,
  resave: false, // no se guardan sesiones en la db
  saveUninitialized: false, // sesion que no hace nada no se guarda en la db
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))

app.use("/", router());

app.listen(process.env.PORT);