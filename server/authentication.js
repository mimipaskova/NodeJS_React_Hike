const passport = require('passport'),
db = require('./models/db_connector'),
LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.User.authenticate( { username, password })
    .then(user => done(null, user), () => done(null, false));
}));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;