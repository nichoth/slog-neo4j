var db = require('./lib/db');

db.query('MATCH (n) DETACH DELETE n', function(err, res) {
  console.log(arguments);
});

/*
db.find({}, function(err, res) {
  if (err) return console.log(err);
  var batch = db.batch();
  res.forEach(function(r) {
    db.relationships(r, function(err, rels) {
      rels.forEach(function(rel) {
        batch.rel.delete(rel);
      });
    })
    batch.delete(r);
  });
  batch.commit(function(err, res) {
    if (err) return console.log(err);
    console.log(res.length+' nodes deleted.');
  });
});
*/
