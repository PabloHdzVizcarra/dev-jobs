const express = require("express");
const router = express.Router();
const homeController = require('../controllers/home-controller');
const vacanciesController = require('../controllers/vacancies-controller');
const usersController = require('../controllers/users-controller');
const expressValidator = require('express-validator');

module.exports = () => {
  router.get("/", homeController.showJobs);
  router.get("/vacancies/new", vacanciesController.formNewVacancy);
  router.post("/vacancies/new", vacanciesController.addVacancy);

  router.get("/vacancies/:url", vacanciesController.showVacancy);

  router.get("/vacancies/edit/:url", vacanciesController.editVacancy);
  router.post("/vacancies/edit/:url", vacanciesController.saveVacancyEdited);

  router.get("/create-account", usersController.formCreateAccount);

  router.post(
    "/create-account",
    usersController.userValidationRules(), //Rules Validation express-validator
    usersController.validate, //validation middleware
    usersController.createNewUser
  );

  router.get('/log-in', usersController.logIn);

  return router;
};

