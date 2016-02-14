var db = require('./db');
var after = require('after');

var next = after(2, console.log.bind(null, 'done'));

db.constraints.uniqueness.create('node', 'name', next);
db.constraints.uniqueness.create('value', 'name', next);

