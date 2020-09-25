const mongoose = require('mongoose');
const Vacancy = mongoose.model('Vacancy');
const { convertFieldStringToArray } = require('../public/functions/convert-string-to-array');

exports.formNewVacancy = (req, res) => {
  res.render('new-vacancy', {
    namePage: 'Nueva Vacante',
    tagline: 'Llena el formulario y publica tu vacante'
  })
}

exports.addVacancy = async (req, res) => {

  // creamos un nuevo objecto, pero modificando los skills a un array
  const result = convertFieldStringToArray(req.body, 'skills');

  // guardamos los datos en mongoose
  const vacancyInDatabase = await new Vacancy(result).save();

  res.redirect(`/vacancies/${vacancyInDatabase.url}`);

};

exports.showVacancy = async (req, res, next) => {

  try {
    const vacancyFromDatabase = await Vacancy.findOne({
      url: req.params.url
    });

    res.render('vacancy', {
      namePage: vacancyFromDatabase.title,
      vacancy: vacancyFromDatabase,
      navbar: true
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

    console.log(vacancyFromDatabase)

    res.render('edit-vacancy', {
      namePage: `Editar - ${vacancyFromDatabase.title}`,
      vacancy: vacancyFromDatabase
    });

  } catch (error) {
    next();
  }
}