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
    res.render("log-in");
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

exports.formEditProfile = (req, res) => {
  res.render('edit-profile', {
    namePage: "Editar tu Perfil en devJobs",
    user: req.user,
    logOut: true,
    name: req.user.name
  })
}

exports.editProfile = async (req, res) => {
  const currentUser = await usersModels.findById(req.user._id);

  // se actualizan los datos con los valores del form
  currentUser.name = req.body.name;
  currentUser.email = req.body.email;

  if (req.body.password) {
    currentUser.password = req.body.password;
  }

  req.flash('correct', 'Cabios guardados correctamente');
  await currentUser.save();
  
  res.redirect('/admin');
  console.log(currentUser);
}

exports.rulesValidateProfile = () => [
  body('name', 'El nombre no puede ir vacio').notEmpty().escape(),
  body('email', 'El email debe ser valido').isEmail().normalizeEmail()
];

exports.validateProfile = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());

  if (errors.isEmpty()) {
    return next();
  }

  req.flash('errors', errors.array().map(error => error.msg));
  res.render('edit-profile', {
    namePage: "Editar tu Perfil en devJobs",
    user: req.user,
    logOut: true,
    name: req.user.name,
    messages: req.flash()
  })

}