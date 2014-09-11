var colors = require('colors');
var util = require('util');
var QlSystemDescription = require('./QlSystemDescription');

var log = {
  error: function(message, target) {
    console.log(('[ERROR] ' + message).red + target);
  },

  system: function(sysDesc) {

    if (!(sysDesc instanceof QlSystemDescription)) {
      throw new Error('expected QlSystemDescription Object');
    }

    var sysDescFormat = '[%s]'.cyan + ' %s' + ' (%s)'.white;
    var sysDescString = util.format(sysDescFormat,
				    sysDesc.type,
				    sysDesc.sysName,
				    sysDesc.sysVer);
    
    console.log(sysDescString);
  }
};

module.exports = log;
