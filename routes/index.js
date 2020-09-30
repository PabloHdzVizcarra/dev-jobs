const express = require("express");
const router = express.Router();
const homeController = require('../controllers/home-controller');
const vacanciesController = require('../controllers/vacancies-controller');
const usersController = require('../controllers/users-controller');
const authController = require('../controllers/auth-controller');
const { param } = require("express-validator");
const multer = require("multer");
var upload = multer({ dest: 'public/uploads' })

module.exports = () => {
  router.get("/", homeController.showJobs);

  router.get("/vacancies/new",
    authController.verifyUser,
    vacanciesController.formNewVacancy
  );

  router.post("/vacancies/new",
    authController.verifyUser,
    vacanciesController.vacancyValidationRules(),
    vacanciesController.validateVacancy,
    vacanciesController.addVacancy
  );

  router.get("/vacancies/:url", vacanciesController.showVacancy);

  router.get("/vacancies/edit/:url",
    authController.verifyUser,
    vacanciesController.editVacancy
  );

  router.post("/vacancies/edit/:url",
    authController.verifyUser,
    vacanciesController.saveVacancyEdited
  );

  router.delete('/vacancies/delete/:id',
    vacanciesController.deleteVacancy
  );

  router.get("/create-account", usersController.formCreateAccount);

  router.post(
    "/create-account",
    usersController.userValidationRules(), //Rules Validation express-validator
    usersController.validate, //validation middleware
    usersController.createNewUser
  );

  router.get('/log-in', usersController.logIn);
  router.post('/log-in', authController.authenticateUser);

  // close sessions
  router.get('/log-out',
    authController.verifyUser,
    authController.logOut
  )

  router.get('/admin',
    authController.verifyUser,
    authController.showAdminPanel
  );

  router.get('/edit-profile',
    authController.verifyUser,
    usersController.formEditProfile
  );

  router.post('/edit-profile',
    // param('password').customSanitizer(value => {
    //   if (value) {
    //     console.log('Se sanitiza password')
    //     return escape(value)
    //   }
    // }),
    authController.verifyUser,
    usersController.rulesValidateProfile(),
    usersController.validateProfile,
    usersController.editProfile
  );

  router.post('/edit-profile-img',
    authController.verifyUser,
    upload.single('image'),
    usersController.saveProfileImage
  );

  return router;
};

