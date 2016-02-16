var db = require('./db');
var data = require('myth-monsters');
var put = require('./putObj.js');
var each = require('async-each-series');

each(data, function(d, next) {
  put(d, next);
}, function allDone(err) {
  if (err) return console.error(err);
  console.log('all done', arguments);
});
