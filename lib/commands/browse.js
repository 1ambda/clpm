// require modules
var util = require('util');
var exec = require('child_process').exec;
var log = require('../utils/log');
var platform = require('../utils/platform');

var browseCommand = platform.browseCommand;
var quickdocs = "http://quickdocs.org";

module.exports = function (system) {

  var cmd = util.format("%s %s/%s",
		       browseCommand, quickdocs, system);

  exec(cmd, function(err, stdout, stderr) {
    if (err) throw err;
  });
};
