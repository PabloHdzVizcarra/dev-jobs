const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: "Agrega tu nombre"
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  token: String,
  expireToken: Date
});

// metodo para hashear passwords
usersSchema.pre('save', async function (next) {
  
  if (!this.isModified('password')) {
    return next();
  }

  const passwordHash = await bcrypt.hash(this.password, 10);
  this.password = passwordHash;
  next();

});

usersSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError'&& error.code === 1100) {
    next('Ese correo ya esta registrado');
  } else {
    next(error);
  }
})

module.exports = mongoose.model('Users', usersSchema);