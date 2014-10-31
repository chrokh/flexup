module.exports = (function(){
  var PEG = require('pegjs');

  var Parser = function(peg){
    this._peg = peg;
  }

  Parser.prototype.parse = function(doc){
    return this._peg.parse(doc);
  }

  return Parser;
})();

