var db = require('./lib/db');
var args = process.argv.slice(2);
var query = args[0] || '{}';
var label = args[1];

db.find(JSON.parse(query), false, label, console.log);
