module.exports = (function(){
  var PEG  = require('pegjs');

  this.build = function(grammar){
    /*
     * TODO: ALL OF THIS FILE
     */

    var json = grammar;
    var grammar = _buildParser(json);
    return PEG.buildParser();
  }

  /*
   *
   * privates
   *
   */

  _buildParser = function(grammar){
    var basegrammar = [
      'start   = content',
      'content = (element / str)*',
      'str     = s:[a-zA-Z \\n]+   {return s.join(\'\');}'
    ];

    var prods = _getProductions(basegrammar, grammar);
    for(var i=0; i<prods.length; i++){
      basegrammar.push(prods[i]);
    }

    return this._grammar.join('\r\n');
  }


  _getProductions = function(basegrammar, grammar){
    console.log("getting...", grammar);
    var nonterminals = _getElementProductions(grammar);
    console.log("...got!");
    //this._addProduction("element", this._getElementProductions());
    //this._addTerminals();
  }

  var _getElementProductions = function(grammar){
    console.log(grammar);
    var r = [];
    var i = 1;
    for(var key in grammar){
      r.push("{0} c:content {1} {return {\"{2}\":c};}".supplant([
        ('STag'+i), ('ETag'+i), key]));
      i++;
    }
    return r;
  }

  var _addTerminals = function(){
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

  var _addTerminal = function(nonterminal, terminal){
    this._grammar.push(("{0} = '{1}'".supplant([nonterminal, terminal])));
  }

  var _addProduction = function(nonterminal, terminals){
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


  return this;
})();

