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

  const extractedErros = [];
  errors.array().map((err) => extractedErros.push({ [err.param]: err.msg }));
  console.log(extractedErros);
};

exports.createNewUser = async (req, res, next) => {
  
  try {
    const user = new usersModels(req.body).save();
    console.log(user);
    res.render("/log-in");
  } catch (error) {
    return next();
  }
};
