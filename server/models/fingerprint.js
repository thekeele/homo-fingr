/*
  Homogeneous Fingers
  app/models/fingerprint.js
*/

var mongoose = require('mongoose');

var fingerprintSchema = mongoose.Schema({
  username: {type: String, required: true},
  ip_address: {type: String, required: false},
  device_id: {type: String, required: true, unique: false},
  timestamp: {type: Date, required: false},
  computation_time: {type: Number, required: false},
  components: {type: Array, required: true}
});

module.exports = mongoose.model('Fingerprint', fingerprintSchema);
