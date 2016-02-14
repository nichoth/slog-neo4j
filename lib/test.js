var db = require('./db');
var data = require('myth-monsters');
var put = require('./putObj.js');

put(data[0], function(err, res) {
  console.error(err);
});
