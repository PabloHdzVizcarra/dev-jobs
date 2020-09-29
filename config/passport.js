// Passport Settings
const passport = require("passport");
const localStrategy = require("passport-local");
const mongoose = require("mongoose");
const UsersModel = mongoose.model("Users");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {

      const userFromDatabase = await UsersModel.findOne({ email: email });

      if (!userFromDatabase) {
        return done(null, false, {
          message: "Usuario no existente",
        });
      }

      const checkPassword = userFromDatabase.confirmPassword(password);

      if (!checkPassword) return done(null, false, {
        message: 'Password incorrecto'
      })

      return done(null, userFromDatabase);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await UsersModel.findById(id);
  return done(null, user);
});

module.exports = passport;