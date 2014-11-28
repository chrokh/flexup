module.exports = (function(){
  var
    PEG = require('pegjs'),
    Grammar;

  Grammar = function(contents){
    this._json = JSON.parse(contents);
  }

  Grammar.prototype.parse = function(contents){
    return this._toParser().parse(contents);
  }

  Grammar.prototype._toParser = function(){
    // Base grammar
    var grammar = [
      'start   = content',
      'content = (element / str)*',
      'str     = s:[a-zA-Z \\n]+   {return s.join(\'\');}'
    ];

    // Add non-terminals
    var prods = this._getProductions();
    var elements = [];
    for(var i=0; i<prods.length; i++){
      elements.push('element' + (i+1));
      grammar.push(prods[i]);
    }
    grammar.push('element = ' + elements.join(' / '));

    // Add terminals
    var terms = this._getTerminals();
    for(var i=0; i<terms.length; i++){
      grammar.push(terms[i]);
    }

    // Line-delimit
    grammar = grammar.join('\r\n');

    // Generate parser
    return PEG.buildParser(grammar);
  }

  Grammar.prototype._getProductions = function(){
    var r = [];
    var i = 1;
    for(var key in this._json){
      r.push("element{0} = {1} c:content {2} {return {\"{3}\":c};}".supplant([
        i,
        ('STag'+i),
        ('ETag'+i),
        key]));
      i++;
    }
    return r;
  }


  Grammar.prototype._getTerminals = function(){
    var terminals = [];

    var i = 1;
    for(var key in this._json){
      var value = this._json[key],
          sTag  = value.substring(0, value.indexOf('%')),
          eTag  = value.substring(value.indexOf('%')+1);

      var nontermS = 'STag' + i;
      var nontermE = 'ETag' + i;

      terminals.push(("{0} = '{1}'".supplant([nontermS, sTag])));
      terminals.push(("{0} = '{1}'".supplant([nontermE, eTag])));

      i++;
    }
    return terminals;
  }



  return Grammar;
})();