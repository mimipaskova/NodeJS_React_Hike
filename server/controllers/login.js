const express = require('express'),
	authentication = require('../authentication'),
	db = require('../models/db_connector'),
	Router = express.Router,
	app = Router();

app.post('/register', function (req, resp) {
  db.User.registerUser(req.body)
  .then(newUser => {
      console.log(newUser);
      req.session.user = newUser;
      resp.sendStatus(200);
  }, err => {
      console.error('Cannot create user', err);
      resp.sendStatus(403);
  });
});

app.post('/login',
  authentication.authenticate('local'),
  function (req, res) {
    res.json(req.user);
});

app.post('/logout', function(req, res) {
  req.logout();
  res.sendStatus(200);
});

app.use('/', function (req, res, next) {
  if (req.user) {
    return next();
  }
  res.sendStatus(401);
});

app.get('/profile', function(req, res) {
  res.json(req.user);
});

app.put('/me', function (req, res) {
    db.User.findOneAndUpdate({_id:req.user._id}, req.body, {new:true})
    .then(
        updatedUser => res.json(updatedUser),
        err => {
            console.error('Cannot update the user', err);
            res.sendStatus(500)
        }
    );
});

module.exports = app;