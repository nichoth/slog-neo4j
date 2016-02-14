var db = require('./lib/db');

db.find({}, function(err, res) {
  if (err) return console.log(err);
  var batch = db.batch();
  res.forEach(function(r) {
    batch.delete(r);
  });
  batch.commit(function(err, res) {
    if (err) return console.log(err);
    console.log(res.length+' nodes deleted.');
  });
});
