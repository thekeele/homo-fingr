/*
  Homogeneous Fingers
  app/models/fingerprint.js
*/

var mongoose = require('mongoose');

var fingerprintSchema = mongoose.Schema({
  username: {type: String, required: false, unique: true},
  ip_address: {type: String, required: false},
  device_id: {type: String, unique: true},
  timestamp: Date,
  computation_time: Number,
  fingerprint: Array
});

module.exports = mongoose.model('Fingerprint', fingerprintSchema);
