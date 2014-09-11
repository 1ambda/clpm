
// require modules
var util = require('util');
var exec = require('child_process').exec;
var parseQuicklispStdout = require('./parseQuicklisp').parseQuicklispStdout;
var log = require('./log');

// constants
var SEARCH_FORMAT= 'sbcl --noinform --quit --eval \'(ql:system-apropos \"%s\")\'';

// exported function
module.exports = function (package) {
  var command = util.format(SEARCH_FORMAT, package);

  exec(command, function(err, stdout) {
    // case: error
    if (err) throw err;

    // case: system not found
    if (stdout === "") {
      log.error('system not found: ', package);
      return;
    }

    // case: found systems 
    if (stdout) {
      parseQuicklispStdout(stdout);
    }
  });
  
  return module;
};

