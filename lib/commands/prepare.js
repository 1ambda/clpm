
// require modules
var util = require('util');
var exec = require('child_process').exec;
var log = require('../utils/log');

/*
 * handle prepare commands
 * lpm -p sbcl
 * lpm -p quicklisp
 * lpm -p qlot
 * lpm -p all : install sbcl, quicklisp and qlot
 */
module.exports = function (program) {

  program = program.toLowerCase();
};
