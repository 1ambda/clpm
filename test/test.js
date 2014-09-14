// require modules
var should = require('should');

// custom modules
var parseSystem = require('../lib/commands/search').parseSystem;
var QlSystemDescription = require('../lib/models/QlSystemDescription');
var log = require('../lib/utils/log');
var preBrowse= require('../lib/commands/browse').preBrowse;

describe('file: search.js', function() {
  describe('#parseSystem', function() {
    it('should parse string and return QlSystemDescription object', function() {
      
      var string =
	    '#<SYSTEM xmls-tools / xmls-tools-20110320-http / quicklisp / 2014-08-26>';

      var qlSysDescObj = parseSystem(string);
      qlSysDescObj.should.be.an.instanceof(QlSystemDescription);

    });

    it('should return null when given string is invalid format', function() {
      var invalidStr =
	    '#<xmls-tools / xmls-tools-20110320-http / quicklisp / 2014-08-26>';

      (parseSystem('') === null).should.be.true;
      (parseSystem(invalidStr) === null).should.be.true;
    });
  });
});

describe('file: log.js', function() {
  describe('#log.system', function() {
    it('should throw an error when given object isn\'t inst of QlSystemDescription ', function() {
      (log.system.bind(null, {taaype: 'System', sysName: 'xml-1.5', sysVer: '20131110'}))
        .should.throw('expected QlSystemDescription Object');
    });
  });
});

// this test should be run under networking enable environment
describe('file: browse.js', function() {
  describe('#preBrowse', function() {
    it("should never call the callback when statusCode != 200", function(done) {
      preBrowse('NonExistsSystem#', function(err) {
	should.exist(err);
	err.message.should.equal('Page not found');
	done();
      });
    });
  });
});
