var http = require('http');
var seraph = require('seraph');
var db = require('./lib/db');

http.createServer(function(req, resp) {
  resp.setHeader('Content-Type', 'text/html');
  resp.write('<pre>');
  db.find({}, function(err, res) {
    if (err) return console.log(err);
    resp.write(JSON.stringify(res, null, 2));
    resp.end('</pre>');
  });
}).listen(process.env.PORT || 8000);

