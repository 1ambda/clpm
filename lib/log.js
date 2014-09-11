var colors = require('colors');

var log = {
  error: function(message, target) {
    console.log(('[ERROR] ' + message).red + target);
  }
};

module.exports = log;
