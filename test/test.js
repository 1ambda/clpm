var should = require('should');
var parseSystem = require('../lib/parseQuicklisp').parseSystem;
var QlSystemDescription = require('../lib/QlSystemDescription');
var log = require('../lib/log');

describe('file: parseQuicklisp.js', function() {
  describe('#parseSystem', function() {
    it('should parse string and return QlSystemDescription object', function() {
      
      var string =
	    '#<SYSTEM xmls-tools / xmls-tools-20110320-http / quicklisp / 2014-08-26>';

      var qlSysDescObj = parseSystem(string);
      qlSysDescObj.should.be.an.instanceof(QlSystemDescription);

    });

    it('should throw an error when given string is invalid format', function() {
      var invalidStr =
	    '#<xmls-tools / xmls-tools-20110320-http / quicklisp / 2014-08-26>';
      
      (parseSystem.bind(null, ''))
        .should.throw('quicklisp system description changed');
      (parseSystem.bind(null, invalidStr))
        .should.throw('quicklisp system description changed');
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
