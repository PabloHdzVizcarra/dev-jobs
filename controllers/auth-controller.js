const passport = require('passport');
const mongoose = require('mongoose');
const vacancyModel = mongoose.model('Vacancy');

exports.authenticateUser = passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/log-in',
  failureFlash: true,
  badRequestMessage: 'Ambos campos son obligatorios',
});

exports.verifyUser = (req, res, next) => {

  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/log-in');
}

exports.showAdminPanel = async (req, res) => {

  const vacanciesList = await vacancyModel.find({ author: req.user._id });

  

  res.render('admin', {
    namePage: 'Panel de Administracion',
    tagline: 'Crea y Administra tus vacantes desde aqui',
    vacancies: vacanciesList,
    logOut: true,
    name: req.user.name,
  image: req.user.imageProfile
  })
}

exports.logOut = (req, res) => {
  req.logout();
  req.flash('correct', 'Cerraste sesion con exito');
  return res.redirect('/log-in');
}

