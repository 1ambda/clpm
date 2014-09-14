
// require modules
var colors = require('colors');
var util = require('util');

// custom modules
var QlSystemDescription = require('../models/QlSystemDescription');

var env = process.env.NODE_ENV;
var log = {
  system: function(sysDesc) {

    if (!(sysDesc instanceof QlSystemDescription)) {
      throw new Error('expected QlSystemDescription Object');
    }

    var fmt = '  [%s]'.cyan + ' %s' + ' (%s)'.white;
    var string = util.format(fmt, sysDesc.type,
			     sysDesc.sysName,
			     sysDesc.sysVer);
    console.log(string);
  },
  update: function(stdout) {
    var fmt = "  [UPDATE]".yellow + ' %s';
    var string = util.format(fmt, stdout);

    console.log(string);
  },

  error: (env === "test") ? function(){} : function(message, err) {
    // err can be undefined
    err = (err !== undefined) ? err.bold : '';
    console.log('  [ERROR] '.red + message + err);
  },

  lpm: function(message, target) {
    // target can be undefined
    target = (target !== undefined) ? target.bold : '';
    console.log('  [LPM] '.green + message + target);
  }
};

module.exports = log;
