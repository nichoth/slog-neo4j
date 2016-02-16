var db = require('./lib/db');

/*
var q = 'MATCH (monster)-[predicate:mythology]->(value)' +
        'RETURN monster, predicate, value';
*/

var q = 'MATCH (n)-[r]->(m) RETURN DISTINCT type(r)';

db.query(q, {}, function(err, res) {
  if (err) return console.log( err );
  console.log(res);
});
