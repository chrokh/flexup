module.exports = (function(){
  var PEG  = require('pegjs');

  var ParseBuilder = function(fupd){
    this._fupd = fupd;
  }

  ParseBuilder.prototype.getParser = function(){
    return PEG.buildParser(this._getGrammar());
  }

  ParseBuilder.prototype._getGrammar = function(){
    this._grammar = [
      'start   = (element / str)*',
      'content = (element / str)*',
      "str     = s:[a-zA-Z \\n]+   {return s.join('');}"
    ];
    this._addAllProductionsFromFUPD();

    return this._grammar.join('\r\n');
  }

  ParseBuilder.prototype._addAllProductionsFromFUPD = function(nonterminal, terminal){
    this._addProduction("element", this._getElementProductions());
    this._addTerminals();
  }

  ParseBuilder.prototype._getElementProductions = function(){
    var r = [];
    var i = 1;
    for(var key in this._fupd){
      r.push("{0} c:content {1} {return {\"{2}\":c};}".supplant([
        ('STag'+i), ('ETag'+i), key]));
      i++;
    }
    return r;
  }

  ParseBuilder.prototype._addTerminals = function(){
    var i = 1;
    for(var key in this._fupd){
      var value = this._fupd[key],
          sTag  = value.substring(0, value.indexOf('%')),
          eTag  = value.substring(value.indexOf('%')+1);

      this._addTerminal(('STag'+i), sTag);
      this._addTerminal(('ETag'+i), eTag);
      i++;
    }
  }

  ParseBuilder.prototype._addTerminal = function(nonterminal, terminal){
    this._grammar.push(("{0} = '{1}'".supplant([nonterminal, terminal])));
  }

  ParseBuilder.prototype._addProduction = function(nonterminal, terminals){
    var expanded = terminals.join(' / ');
    this._grammar.push("{0} = {1}".supplant([nonterminal, expanded]));
  }





  String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
      function (a, b) {
        var r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      }
      );
    // http://javascript.crockford.com/remedial.html
    // http://stackoverflow.com/questions/1408289/best-way-to-do-variable-interpolation-in-javascript
  };


  return ParseBuilder;
})();

