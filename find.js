var db = require('./lib/db');
var args = process.argv.slice(2);
var query = args[0];

db.find(JSON.parse(query), console.log);
