/*
  homo-fingr
  server/routes/api.js
*/

var User = require('../models/user');
var Fingerprint = require('../models/fingerprint');

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

  /*
    Fingerprint Routes
    - get /fingers
    - post /fingers
    - get /fingers/:username
    - put /fingers/:finger_id
    - delete /fingers/:finger_id
  */
  // app.get('/fingers', function(req, res) {
  //   Fingerprint.find({}, function(err, users) {
  //     if (err) {
  //       res.send(err);
  //     }

  //     console.log('get /fingers');
  //     res.json(users);
  //   })
  // });

  app.post('/api/fingers', function(req, res) {
    var data = req.body.fingerprint;

    var fingerprint = new Fingerprint({
      username: data.username,
      ip_address: data.ip_address,
      device_id: data.device_id,
      timestamp: data.timestamp,
      computation_time: data.computation_time,
      components: data.components
    });

    fingerprint.save(function(err) {
      if (err) { throw err; }

      console.log('Fingerprint: ' + data.device_id + ' saved to database');
      res.status(200).json({ status: 'Fingerprint: ' + data.device_id + ' saved to database' });
    });

    // Fingerprint.findOne({device_id: data.device_id}, function(err, results) {
    //   if (err) { throw err; }

    //   if(!results) {
    //     fingerprint.save(function(err) {
    //       if (err) { throw err; }

    //       console.log('Fingerprint: ' + data.device_id + ' saved to database');
    //       res.status(200).json({ status: 'Fingerprint: ' + data.device_id + ' saved to database' });
    //     });
    //   }

    //   console.log('Fingerprint: ' + data.device_id + ' already in database');
    //   res.status(200).json({ status: 'Device ID exists' });
    // });
  });

  app.get('/api/fingers/:username', function(req, res) {
    Fingerprint.find({username: req.params.username}, function(err, user) {
      if (err) { throw err; }

      console.log('user: ' + user);
      res.status(200).json(user);
    });
  });

  /*
    Middleware
    - ensures that a user is logged in
  */
  function isLoggedIn(req, res, next) {
    console.log('req.session: ' + JSON.stringify(req.session));
    if (req.isAuthenticated()) {
      return next();
    }

    return res.status(500).json({ err: 'Not authorized for request' });
  }
};
