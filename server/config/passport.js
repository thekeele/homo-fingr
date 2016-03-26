/*
  homo-fingr
  server/config/passport.js
*/

var LocalStrategy = require('passport-local').Strategy;
// var User = require('../models/user');
console.log('passport');

module.exports = function(passport) {
  /*
    Session Setup
    - gives persistent login sessions
    - passport serializes and unserializes users out of session
  */
  // passport.serializeUser(function(user, done) {
  //   console.log('User Serialized');
  //   done(null, user.id);
  // });

  // passport.deserializeUser(function(id, done) {
  //   console.log('User Deserialized');
  //   User.findById(id, function(err, user) {
  //     done(err, user);
  //   });
  // });

  /*
    Local Registration
  */
  // passport.use('local-register', new LocalStrategy({
  //     usernameField: 'username',
  //     passwordField: 'password',
  //     passReqToCallback: true
  //   },
  //   function(req, username, password, done) {
  //     console.log('Passport Register LocalStrategy, waiting for nextTick');
  //     // asynchronous, User.findOne() won't fire unless data is sent back
  //     process.nextTick(function() {
  //       console.log('... and the nextTick');
  //       // check if a username already exists
  //       //  - exists: show flash message
  //       //  - else: create new user with username and password
  //       User.findOne({'local.username': username}, function(err, user) {
  //         console.log('Searching for existing username');
  //         if (err) { return done(err); }

  //         // username is already taken
  //         if (user) {
  //           console.log('Duplicate User');
  //           return done(null, false, req.flash('registerMessage', 'That username is already taken'));
  //         } else {
  //           console.log('Building a newUser');
  //           var newUser = new User();
  //           newUser.local.username = username;
  //           newUser.local.password = newUser.generateHash(password);

  //           newUser.save(function(err) {
  //             if (err) { throw err; }
  //             console.log('Saving newUser');
  //             return done(null, newUser);
  //           });
  //         }
  //       });
  //     });
  // }));

  /*
    Local Login
  */
  // passport.use('local-login', new LocalStrategy({
  //     usernameField: 'username',
  //     passwordField: 'password',
  //     passReqToCallback: true
  //   },
  //   function(req, username, password, done) {
  //     console.log('Passport Login LocalStrategy');
  //     // check if a username already exists
  //     User.findOne({'local.username': username}, function(err, user) {
  //       console.log('Searching for existing username');
  //       if (err) { return done(err); }

  //       // no user is found, return flash message
  //       if (!user) {
  //         console.log('Username Does Not Exist');
  //         return done(null, false, req.flash('loginMessage', 'Username Does Not Exist'));
  //       }

  //       // user is found but passwords do not match
  //       if(!user.validPassword(password)) {
  //         console.log('Password Does Not Match');
  //         return done(null, false, req.flash('loginMessage', 'Password Does Not Match'));
  //       }

  //       // success
  //       return done(null, user);
  //     });
  // }));
};
