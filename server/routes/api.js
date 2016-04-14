/*
  homo-fingr
  server/routes/api.js
*/

var User = require('../models/user');
var Fingerprint = require('../models/fingerprint');

module.exports = function(app, passport) {

  app.post('//api/register', function(req, res, next) {
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

  app.post('//api/login', function(req, res, next) {
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

  app.get('//api/logout', function(req, res) {
    console.log('req.session: ' + JSON.stringify(req.session));
    req.logout();
    res.status(200).json({ status: 'Logged Out' });
  });

  // app.get('/api/status', function(req, res) {
  //   console.log('req.session ', JSON.stringify(req.session));
  //   res.status(200).json({ status: 'isLoggedIn' });
  // });

  /*
    Fingerprint Routes
    - get /fingers
    - post /fingers
    - get /fingers/:username
    - put /fingers/:finger_id
    - delete /fingers/:finger_id
  */
  app.get('//api/fingers', function(req, res) {
    Fingerprint.find({}, function(err, fingers) {
      if (err) {
        res.send(err);
      }

      console.log('get fingers');
      res.json(fingers);
    })
  });

  app.post('//api/fingers', function(req, res) {
    console.log('post fingers');
    var data = req.body.fingerprint;
    var user = true;
    var device_id = false;

    var fingerprint = new Fingerprint({
      username: data.username,
      ip_address: data.ip_address,
      device_id: data.device_id,
      timestamp: data.timestamp,
      computation_time: data.computation_time,
      components: data.components
    });

    console.log('find users');
    Fingerprint.find({username: data.username}, function(err, results) {
      if (err) {
        res.send(err);
      }

      // user not in database
      if(results.length === 0) {
        console.log('user not in database');
        user = false;
      } else {
        console.log('user is in the database');
        // user is in the database
        for(var i = 0; i < results.length; i++) {
          console.log('data.device_id: ', data.device_id);
          console.log('results[i].device_id: ', results[i].device_id);
          // check if users device id is in the database
          if (data.device_id === results[i].device_id) {
            device_id = true;
            break;
          }
        }
      }

      if (user === true && device_id === true) {
        console.log('Users Fingerprint: ' + data.device_id + ' already in database');
        res.status(200).json({ status: 'Users Device ID exists' });
      } else {
        fingerprint.save(function(err) {
          if (err) {
            res.send(err);
          }

          console.log('Fingerprint: ' + data.device_id + ' saved to database');
          res.status(200).json({ status: 'Fingerprint: ' + data.device_id + ' saved to database' });
        });
      }
    });
  });

  app.get('//api/fingers/:username', function(req, res) {
    console.log('find user');
    Fingerprint.find({username: req.params.username}, function(err, user) {
      if (err) {
        res.send(err);
      }

      console.log('found user fp');
      res.status(200).json(user);
    });
  });

  app.get('//api/distinct', function(req, res) {
    console.log('finding distinct devices');
    Fingerprint.find().distinct('device_id', function(err, ids) {
      if (err) {
        res.send(err);
      }
      console.log(ids.length + ' ids');
      fps = []
      for (int i = 0; i < ids.length; i++) {
        Fingerprint.find({device_id: ids[i]}, function(err, fp) {
          console.log('found fp by device_id');
          if (err) {
            res.send(err);
          }
          fps.push(fp);
        });
      }
      if ids.length === fps.length {
        console.log('found distinct fps');
        res.status(200).json(fps);
      }
    });
  });

  /*
    Middleware
    - ensures that a user is logged in
  */
  // function isLoggedIn(req, res, next) {
  //   console.log('req.session: ' + JSON.stringify(req.session));
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }

  //   return res.status(500).json({ err: 'Not authorized for request' });
  // }
};
