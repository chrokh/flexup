module.exports = (function(){
  var FlxTree  = require('./flxtree.js');
  /*
    xpath    = require('xpath'),
    dom      = require('xmldom').DOMParser;*/

  Interpretation = function(f){
    this._f = f;
  }

  Interpretation.prototype.interpretate = function(contents){
    this._f(new FlxTree(contents));
    return contents;
  }


  return Interpretation;
})();