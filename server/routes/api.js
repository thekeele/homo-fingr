/*
  homo-fingr
  server/routes/api.js
*/

var User = require('../models/user');

module.exports = function(app, passport) {

  app.post('/api/register', function(req, res, next) {
    console.log('req.session: ' + JSON.stringify(req.session));
    passport.authenticate('local-register', function(err, user, info) {
      if (err) {
        console.log('register error');
        return res.status(500).json({ err: err });
      }

      if (!user) {
        console.log('username exists');
        return res.status(500).json({ status: 'Username exists' });
      }

      req.login(user, function(err) {
        if (err) { return next(err); }
        return res.status(200).json({ status: 'Register successful'});
      });
    })(req, res, next);
  });

  app.post('/api/login', function(req, res, next) {
    console.log('req.session: ' + JSON.stringify(req.session));
    passport.authenticate('local-login', function(err, user, password) {
      if (err) {
        console.log('register error');
        return res.status(500).json({ err: err });
      }

      if (!user) {
        console.log('username incorrect');
        return res.status(500).json({ status: 'Username incorrect' });
      }

      if (!password) {
        console.log('password incorrect');
        return res.status(500).json({ status: 'Password incorrect' });
      }

      req.login(user, function(err) {
        if (err) { return next(err); }
        return res.status(200).json({ status: 'Login successful'});
      });
    })(req, res, next);
  });

  app.get('/api/logout', function(req, res) {
    console.log('req.session: ' + JSON.stringify(req.session));
    req.logout();
    res.status(200).json({ status: 'Logged Out' });
  });

  app.get('/api/status', function(req, res) {
    console.log('req.session ', JSON.stringify(req.session));
    res.status(200).json({ status: 'isLoggedIn' });
  });

  function isLoggedIn(req, res, next) {
    console.log('req.session: ' + JSON.stringify(req.session));
    if (req.isAuthenticated()) {
      return next();
    }

    return res.status(500).json({ err: 'Not authorized for request' });
  }
};
