const mongoose = require('mongoose');
const Vacancy = mongoose.model('Vacancy');
const { body, validationResult } = require('express-validator');
const { convertFieldStringToArray } = require('../public/functions/convert-string-to-array');

exports.formNewVacancy = (req, res) => {
  res.render('new-vacancy', {
    namePage: 'Nueva Vacante',
    tagline: 'Llena el formulario y publica tu vacante',
    logOut: true,
    name: req.user.name,
    image: req.user.imageProfile
  })
}

exports.addVacancy = async (req, res) => {

  // creamos un nuevo objecto, pero modificando los skills a un array
  const result = convertFieldStringToArray(req.body, 'skills');

  result.author = req.user._id; //_ agregamos el id del usuario a la vacante

  // guardamos los datos en mongoose
  const vacancyInDatabase = await new Vacancy(result).save();

  res.redirect(`/vacancies/${vacancyInDatabase.url}`);

};

exports.showVacancy = async (req, res, next) => {

  

  try {

    // Relacionar el documento con el autor
    const vacancyFromDatabase = await Vacancy.findOne({
      url: req.params.url
    }).populate('author');

    console.log(vacancyFromDatabase)

    res.render('vacancy', {
      namePage: vacancyFromDatabase.title,
      vacancy: vacancyFromDatabase,
      navbar: true,
    });

  } catch (error) {
    console.log(error)
    next();
  }
  
}

exports.editVacancy = async (req, res, next) => {
  

  try {
    const vacancyFromDatabase = await Vacancy.findOne({
      url: req.params.url
    });

    res.render('edit-vacancy', {
      namePage: `Editar - ${vacancyFromDatabase.title}`,
      vacancy: vacancyFromDatabase,
      logOut: true,
      name: req.user.name,
      image: req.user.imageProfile
    });

  } catch (error) {
    next();
  }
}

exports.saveVacancyEdited = async (req, res, next) => {

  try {
    const result = convertFieldStringToArray(req.body, 'skills');


    const vacancy = await Vacancy.findOneAndUpdate(
      { url: req.params.url },
      result,
      {
        new: true,
        runValidators: true
      }
    );

    res.redirect(`/vacancies/${vacancy.url}`);


  } catch (error) {
    console.log(error);
    return next();
  }

}

exports.vacancyValidationRules = () => [
  body('title', 'Agrega un titulo a la vacante').notEmpty().escape(),
  body('company', 'Agrega una empresa').escape().notEmpty(),
  body('location', 'Agrega una ubicacion valida').escape().notEmpty(),
  body('contract', 'Selecciona el tipo de contrato').escape().notEmpty(),
  body('skills', 'Agrega al menos una habilidad').escape().notEmpty(),
];

// Validar y sanitizar los campos de las vacantes
exports.validateVacancy = (req, res, next) => {

  const errors = validationResult(req);
  console.log(errors.array());

  if (errors.isEmpty()) {
    return next();
  }

  req.flash('errors', errors.array().map(error => error.msg));
  res.render('new-vacancy', {
    namePage: 'Nueva Vacante',
    tagline: 'Llena el formulario y publica tu vacante',
    logOut: true,
    name: req.user.name,
    messages: req.flash()
  });
  
}

exports.deleteVacancy = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  const vacancyFromDatabase = await Vacancy.findById(id);

  if (verifyAuthor(vacancyFromDatabase, req.user)) {
    //_ si es el usuario eliminar
    vacancyFromDatabase.remove();
    res.status(200).send("Vacante Eliminada Correctamente");
  } else {
    //_ no permitido
    res.status(403).send("Error");
  }
};

const verifyAuthor = (vacancy = {}, user = {}) => {
  if (!vacancy.author.equals(user._id)) {
    return false;
  }
  return true;
};