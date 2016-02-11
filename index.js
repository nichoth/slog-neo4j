require('dotenv').config({silent: true});
var http = require('http');
var neo = require('neo4j');
var assert = require('assert');
var seraph = require('seraph');
var data = require('myth-monsters');

var dbUrl = process.env.GRAPHENEDB_URL;
assert.ok(dbUrl, 'need a db url');

/*
// neo4j
var db = new neo.GraphDatabase(dbUrl);
var node = db.createNode({hello: 'world'});
node.save(function(err, node) {
  if (err) throw err;
  console.log(node);
});
*/

// seraph
var url = require('url').parse(dbUrl);
var db = seraph({
  server: url.protocol + '//' + url.host,
  user: url.auth.split(':')[0],
  pass: url.auth.split(':')[1]
});

http.createServer(function(req, resp) {
  resp.setHeader('Content-Type', 'text/html');
  resp.write('<pre>');
  db.find({}, function(err, res) {
    if (err) return console.log(err);
    resp.write(JSON.stringify(res, null, 2));
    resp.end('</pre>');
  });
}).listen(process.env.PORT || 8000);

