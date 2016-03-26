/*
  Homogeneous Fingers
  app/models/user.js
*/

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String
  }
});

userSchema.methods.generateHash = function(password) {
  console.log('Generating a password hash + salt');
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  console.log('Validating password');
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
