/*
 * requires modules
 */
var util = require('util');
var exec = require('child_process').exec;

var SEARCH_FORMAT= 'sbcl --noinform --quit --eval \'(ql:system-apropos \"%s\")\'';

function search(package) {
  var command = util.format(SEARCH_FORMAT, package);

  exec(command, function(err, stdin) {
    if (err) throw new Error(err);
    if (stdin) console.log("stdin" + stdin);
    if (stdin === "") console.log('no system like: ' + package);
  });
  
  return module;
}

var options = {
  search: search
};


module.exports = options;
