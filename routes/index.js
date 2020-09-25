const express = require("express");
const router = express.Router();
const homeController = require('../controllers/home-controller');
const vacanciesController = require('../controllers/vacancies-controller');

module.exports = () => {
  
  router.get("/", homeController.showJobs);
  router.get('/vacancies/new', vacanciesController.formNewVacancy);
  router.post('/vacancies/new', vacanciesController.addVacancy);

  router.get('/vacancies/:url', vacanciesController.showVacancy);

  router.get('/vacancies/edit/:url', vacanciesController.editVacancy);

  return router;
};

