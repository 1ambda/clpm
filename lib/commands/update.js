
// require modules
var util = require('util');
var exec = require('child_process').exec;

// custom modules
var log = require('../utils/log');
var platform = require('../utils/platform');

// constants
var LISP_IMPLEMENTATION = platform.implementation;

// strings
var updateClientCmd = '%s --noinform --quit --eval "(ql:update-client)"';
var updateAllDistsCmd= '%s --noinform --quit --eval "(ql:update-all-dists)"';

/*
 * handle update commands
 * lpm -u client : ql:update-client
 * lpm -u dist : ql:update-all-dists
 */
function update(cmd) {

  cmd = cmd.toLowerCase();
  var lispCmd;

  switch (cmd) {
  case "client" :
    lispCmd = util.format(updateClientCmd, LISP_IMPLEMENTATION); break;
  case "dist" :
    lispCmd = util.format(updateAllDistsCmd, LISP_IMPLEMENTATION); break;
  default:
    log.lpm("Invalid update option specified: ",  "use 'client' or 'dist'");
    return;
  }

  exec(lispCmd, function(err, stdout, stderr) {
    if (err) throw err;

    if (stdout) {
      stdout = stdout.trim(); // remove last new-line char or spaces
      log.update(stdout);
    }
  });
}

module.exports = update;
