// require modules
var util = require('util');
var exec = require('child_process').exec;
var request = require('request');

// custom moduels
var search = require('./search').search;
var log = require('../utils/log');
var platform = require('../utils/platform');

var browseCommand = platform.browseCommand;
var quickdocsUrl = "http://quickdocs.org";

function preBrowse (system, callback) {

  var queryUrl = util.format('%s/%s',
			    quickdocsUrl, system);

  request(queryUrl, function(err, res, body) {
    if (err) throw err; // case: request module error
    if (res.statusCode != 200) {
      // case: Page not found
      // print related search result instead of opening the browser
      var message = util.format("Can't find system [%s] : ", system);
      var bold = "What about these packages?";
      log.lpm(message, bold);
      search(system);
    } else {
      callback(null);
    }
  });
}

function browse(system) {

  var cmd = util.format("%s %s/%s",
			browseCommand,
			quickdocsUrl,
			system);

  // check whether the page exists or not before open browser
  preBrowse(system, function(preBrowseErr) {

    if (preBrowseErr) throw preBrowseErr;
    // case: No Error, No 404
    exec(cmd, function(execErr, stdout, stderr) {
      if (execErr) throw execErr;
    });
  });
}


exports.browse = browse;
exports.preBrowse = preBrowse;

