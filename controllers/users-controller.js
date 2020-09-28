const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const usersModels = require("../models/users-models");
const { body, validationResult } = require("express-validator");

exports.formCreateAccount = (req, res) => {
  res.render("create-account", {
    namePage: "Crea tu cuenta en devJobs",
    tagline:
      "Comienza a publicar tus vacantes gratis, solo debes crear una cuenta",
  });
};

exports.userValidationRules = () => [
  body("name", "El nombre de usuario no puede ir vacio").not().isEmpty(),
  body("name", "El nombre de usuario debe ser mayor a 3 caracteres").isLength({
    min: 5,
  }),
  body("email", "El email debe ser valido").isEmail(),
  body("password", "El password no puede ir vacio").notEmpty(),
  body("confirm", "Confirmar password esta vacio").notEmpty(),
  // body('password', 'Los passwords deben ser iguales').equals(),
];

exports.validate = (req, res, next) => {
  console.log("Validando");
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));
  // pass the mistakes
  req.flash('errors', extractedErrors);

  res.render("create-account", {
    namePage: "Crea tu cuenta en devJobs",
    tagline:
      "Comienza a publicar tus vacantes gratis, solo debes crear una cuenta",
    messages: req.flash(),
  });

  return;
};

exports.createNewUser = async (req, res, next) => {
  
  try {
    await new usersModels(req.body).save();
    res.render("/log-in");
  } catch (error) {
    req.flash('errors', error);
    res.redirect('/create-account');
  }
};

exports.logIn = async (req, res, next) => {
  res.render('log-in', {
    namePage: 'Iniciar Sesion'
  })
}