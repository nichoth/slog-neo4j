require('dotenv').config({silent: true});
var assert = require('assert');
var seraph = require('seraph');

var dbUrl = process.env.GRAPHENEDB_URL;
assert.ok(dbUrl, 'need a db url');

var url = require('url').parse(dbUrl);
var db = seraph({
  server: url.protocol + '//' + url.host,
  user: url.auth.split(':')[0],
  pass: url.auth.split(':')[1]
});

module.exports = db;
