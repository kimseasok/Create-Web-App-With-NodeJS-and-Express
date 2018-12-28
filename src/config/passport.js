const passport = require('passport');

module.exports = function passportConfig(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  // store user in the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // get user from the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  require('./stategies/local.strategy');
};
