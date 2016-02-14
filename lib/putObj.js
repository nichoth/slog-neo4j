var db = require('./db');
var after = require('after');
var flatten = require('flatten');
var arrify = require('arrify');
var amap = require('map-async');

module.exports = function(obj, done) {

  var batch = db.batch();
  var mainNode = saveType({ name: obj.name }, 'node');
  var keys = Object.keys(obj).filter(function(k) { return k !== 'name'; });

  // make a flat array of values with their fields
  var vals = keys.reduce(function(acc, k) {
    var vs = arrify(obj[k]);
    vs.forEach(function(v) {
      acc.push({ field: k, value: v });
    });
    return acc;
  }, []);

  // find or create value objects and relationships
  findOrCreate(vals.map(function(v) {
    return v.value;
  }), 'value', function gotValues(err, vs) {
    if (err) return console.log(err);
    vals.forEach(function(v, i) {
      batch.relate(mainNode, v.field, vs[i]);
    });

    batch.commit(done);
  });


  function saveType(node, type) {
    var n = batch.save(node);
    batch.label(n, type);
    return n;
  }


  // take flat array of strings of node names
  // return array filled with either real nodes or new nodes
  function findOrCreate(nodes, type, done) {

    amap(nodes, function(node, i, cb) {
      findValue(db, node, function(err, matches) {
        if (err) return cb(err);
        if (matches.length) return cb(null, matches[0]);
        cb(null, saveType({ name: node }, 'value'));
      });
    }, done);


    /*
    var ns = [];
    var next = after(nodes.length, cb);
    nodes.forEach(function(n, i) {
      findValue(db, n, function(err, matches) {
        if (err) return next(err);
        if ( matches.length ) {
          ns.concat(matches);
          return next(null, ns);
        }
        ns[i] = [saveType({ name: n.trim() }, 'value')];
        next(null, ns);
      });
    });
    */
  }

};

function findValue(db, value, cb) {
  db.find({ name: value }, false, 'value', cb);
}


