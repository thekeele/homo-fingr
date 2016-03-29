/*
  homo-fingr
  server/routes/api.js
*/

var User = require('../models/user');

module.exports = function(app, passport) {

  app.post('/api/register', function(req, res) {
    console.log('register route');
    User.register(new User({ username: req.body.username }),
    req.body.password,
    function(err, account) {
      console.log('register callback function');
      if (err) {
        console.log('register error');
        return res.status(500).json({ err: err });
      }
      passport.authenticate('local')(req, res, function() {
        console.log('register success');
        return res.status(200).json({ status: 'Registration successful'});
      });
    });
  });

  app.post('/api/login', function(req, res, next) {
    console.log('login route');
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        console.log('login error');
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ err: info });
      }

      req.logIn(user, function(err) {
        console.log('login success');
        if (err) {
          return res.status(500).json({ err: 'Can not log in user'});
        }
        res.status(200).json({ status: 'Login successful'});
      });
    })(req, res, next);
  });

  app.get('/api/logout', function(req, res) {
    console.log('logout route');
    req.logout();
    res.status(200).json({ status: 'Logged Out'});
  });

  app.get('/api/status', function(req, res) {
    console.log('status route');
    if (!req.isAuthenticated()) {
      return res.status(200).json({ status: false });
    }
    res.status(200).json({ status: true });
  });
};
