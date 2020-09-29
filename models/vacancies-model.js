const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// schema creado en moongose
const vacanciesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "El nombre de la vacante es obligatorio",
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    required: "La ubicacion es obligatoria",
  },
  salary: {
    type: String,
    default: 0,
  },
  contract: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    lowercase: true,
  },
  skills: [String],
  candidates: [
    {
      name: String,
      email: String,
      cv: String,
    },
  ],
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: "El autor es obligatorio"
  }
});

// agregamos valores al schema antes de guardarlo en la database
vacanciesSchema.pre('save', function (next) {
  
  // crear la URL
  const url = slug(this.title);
  this.url = `${url}-${shortid.generate()}`;

  next();
});

module.exports = mongoose.model("Vacancy", vacanciesSchema);
