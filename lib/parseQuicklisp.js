/*
 * require modules
 */
var util = require('util');
var log = require('./log');
var QlSystemDescription = require('./QlSystemDescription');

function parseStdout(stdout) {
  var systems = stdout.split('\n');
  systems.pop(); // remove empty array
  systems.forEach(function(sys) {
    log.system(parseSystem(sys));
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
  //var sysDescArr = sys.split(/[(\s\/\s) #<>]/).filter(Boolean);
  var sysDescArr = sys.split(/[ #<>]|\/(?!\w)/).filter(Boolean);
  // /[ #<>]| \/ ]/

  if (sysDescArr.length != 5) {
    // case: got invalid format str
    // or, quicklisp changed it's sys desc format
    throw new Error('can\'t parse quicklisp system description\n' + sys);
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

exports.parseQuicklispStdout = parseStdout;
exports.parseSystem = parseSystem;

