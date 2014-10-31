module.exports = (function(){
  var PEG = require('pegjs');

  var ParseBuilder = function(fupd){
    this._fupd = fupd;
  }

  ParseBuilder.prototype.getParser = function(){
    return PEG.buildParser(_getGrammar());
  }


  function _getGrammar(){
    return [
    "start",
    "  = (element / str)*",
    "",
    "element",
    "  = t:STag c:content ETag {return {t:c};}",
    "",
    "content",
      '= (element / str)*',
    "",
    "STag = '**'",
    "ETag = '**'",
    "",
    "str = s:[a-zA-Z \\n]+   {return s.join('');}",
    ""].join('\r\n');
  }


  return ParseBuilder;
})();

