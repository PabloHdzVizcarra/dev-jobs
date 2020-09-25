const mongoose = require('mongoose');
const Vacancy = mongoose.model('Vacancy');

exports.showJobs = async (req, res, next) => {

  const listOfVacanciesFromDatabase = await Vacancy.find();
  

  if (!listOfVacanciesFromDatabase) return next();

  res.render('home', {
    namePage: 'Dev Jobs',
    tagline: 'Encuentra y Publica trabajos',
    navbar: true,
    button: true,
    vacancysData: listOfVacanciesFromDatabase,
  });
}