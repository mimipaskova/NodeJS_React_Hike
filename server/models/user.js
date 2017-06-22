var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var usersSchema = new Schema({
  email: {type: String, unique: true, required: true},
  username: {type: String, unique: true},
  password: {type: String, required:true},
  salt: {type: String, required:true}
});

var User = mongoose.model('user', usersSchema, 'users');

User.registerUser = function ({ username, password }) {
  var newUser = new User();
  newUser.email = username;
  newUser.password = password;
  newUser.salt = crypto.randomBytes(8).toString('hex');
  var hash = crypto.createHash('sha1');
  hash.update(newUser.salt + newUser.password);
  newUser.password = hash.digest('hex');
  return newUser.save();
};

User.authenticate = function ({ username, password }) {
  console.log({ username, password });
  return User.findOne({ email: username })
  .then(user => user || Promise.reject())
  .then(user => {
    var hash = crypto.createHash('sha1');
    hash.update(user.salt + password);
    return user.password === hash.digest('hex') ? user : Promise.reject();
  });
};

module.exports = User;