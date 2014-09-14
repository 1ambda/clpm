// require modules
var util = require('util');
var exec = require('child_process').exec;

// custom moduels
var log = require('../utils/log');
var QlSystemDescription = require('../models/QlSystemDescription');

// strings
var searchCmd = 'sbcl --noinform --quit --eval \'(ql:system-apropos "%s")\'';

// exported function
function search(package) {
  var lispCmd = util.format(searchCmd, package);

  exec(lispCmd, function(err, stdout, stderr) {
    // case: stderror
    if (err) {
      log.error('exec failed', err.stack);
      return;
    }

    // case: system not found
    if (stdout === "") {
      log.lpm('system not found: ', '[' + package + ']');
      return;
    }

    // case: found systems 
    if (stdout) {
      parseStdout(stdout);
    }
  });
}

function parseStdout(stdout) {
  var systems = stdout.split('\n');
  systems.pop(); // remove empty array
  systems.forEach(function(sys) {
    var qlSysDescObj = parseSystem(sys);
    if (qlSysDescObj) log.system(qlSysDescObj);
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
  var sysDescArr = sys.split(/[ #<>]|\/(?!\w)/).filter(Boolean);

  if (sysDescArr.length != 5) {
    // case: got invalid format str
    // or, quicklisp changed it's sys desc format
    log.error('can\'t parse quicklisp system description\n' ,sys);
    return null;
  }

  var type = sysDescArr[0];
  var sysName = sysDescArr[1];
  var sysVer;
  var date = sysDescArr[2].match(/(\d+)([.a-zA-Z]*)(\d+)/);
  // var packageSite = sysDescArr[3]; 
  // var packageIndexLastUpdated = sysDescArr[4];
  if (date !== null) {
    sysVer = date[0];
  }
  var qlSysDescObj = new QlSystemDescription(type, sysName, sysVer);
  return qlSysDescObj;
}

exports.search = search;
exports.parseSystem = parseSystem; // exports for test
