var db = require('./lib/db.js');
var data = require('myth-monsters');

var b = db.batch();
data.forEach(function(d) {
  b.save(d);
});
b.commit(function(err, res) {
  if (err) return console.log(err);
  console.log('graet', res);
});


