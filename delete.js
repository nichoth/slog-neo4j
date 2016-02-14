var db = require('./lib/db');
var args = process.argv.slice(2);
var id = args[0];

db.delete(id, console.log);
