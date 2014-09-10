/*
 * require modules
 */
var util = require('util');
var exec = require('child_process').exec;
var colors = require('colors');

var SEARCH_FORMAT= 'sbcl --noinform --quit --eval \'(ql:system-apropos \"%s\")\'';

function search(package) {
  var command = util.format(SEARCH_FORMAT, package);

  exec(command, function(err, stdin) {
    // case: error
    if (err) throw err;

    // case: system not found
    if (stdin === "") {
      log.error('system not found: ', package);
      return;
    }

    // case: found systems 
    if (stdin) {
      parseStdin(stdin);
    }
  });
  
  return module;
}

function parseStdin(stdin) {
  var systems = stdin.split('\n');
  systems.pop(); // remove empty array
  systems.forEach(function(sys) {
    parseSystem(sys);
  });
}

/*
 * parsing returned system information
 *
 * expected format :
 * #<SYSTEM sysName / sysNameWithVersion / packageSite / qlClientDate>
 *
 * for example :
 * #<SYSTEM xmls-tools / xmls-tools-20110320-http / quicklisp / 2014-08-26>
 * #<SYSTEM xmls / xmls-1.5 / quicklisp / 2014-08-26>
 * #<SYSTEM zaws / zaws-20121125-git / quicklisp / 2014-08-26>
 */
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

var log = {
  error: function(message, target) {
    console.log(('[ERROR] ' + message).red + target);
  }
};

// exports
exports.search = search;
exports.log = log;
