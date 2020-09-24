const express = require("express");
const router = express.Router();
const homeController = require('../controllers/home-controller');
const vacanciesController = require('../controllers/vacancies-controller');

module.exports = () => {
  
  router.get("/", homeController.showJobs);
  router.get('/vacancies/new', vacanciesController.formNewVacancy);

  return router;
};

