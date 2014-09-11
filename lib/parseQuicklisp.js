/*
 * require modules
 */
var util = require('util');
var log = require('./log');

function parseStdout(stdout) {
  var systems = stdout.split('\n');
  systems.pop(); // remove empty array
  systems.forEach(function(sys) {
    parseSystem(sys);
  });
}

function parseSystem(sys) {
    try {
      sys = sys.split(/[ #/<>]/).filter(function(n) { return n !== '';});
      printSystem(sys);
    } catch (err) {
      log.error('can\'t parse system', err);
    }
}

function printSystem(sysDescArr) {
  try {
    if (sysDescArr.length != 5) {
      throw new Error('quicklisp system description changed');
    }

    var type = sysDescArr[0];
    var sysName = sysDescArr[1];
    var sysVersion;
    var date = sysDescArr[2].match(/(\d+)([.a-zA-Z]*)(\d+)/);
    if (date !== null) {
      sysVersion = date[0];
    }

    /*
     * Unused variables
     *
     * var packageSite = sysDescArr[3];
     * var packageIndexLastUpdated = sysDescArr[4];
     */

    var sysFormat =
	  util.format('[%s]'.cyan + ' %s' + ' (%s)'.white,
		      type,
		      sysName,
		      sysVersion);
    
    console.log(sysFormat);
  } catch (err) {
    log.error('can\'t parse system information array', err);
  }
}

exports.parseQuicklispStdout = parseStdout;
