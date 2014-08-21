module.exports = (function(){
  var Pattern    = require('./pattern.js'),
      RegexMatch = require('./regex_match.js');

  var Library = function(){
    this.items = [];
  };

  Library.prototype.addMany = function(defs){
    for(var key in defs)
      this.add(key, defs[key]);
  };

  Library.prototype.add = function(name, pattern){
    this.items.push(new Pattern(name, pattern));
  };

  Library.prototype.toRegex = function(){
    var reg = this.items.map(function(e){
      return e.toRegexString();
    });
    reg = reg.join('|');
    //reg = '/' + reg + '/';
    return new RegExp(reg, 'g');
  }

  Library.prototype.execute = function(doc){
    var m, regex, tag;

    regex = this.toRegex();

    while((m = regex.exec(doc)) !== null){
      match = new RegexMatch(m);
      tag = this.atIndex(match.getPatternIndex() - 1).name;
      doc = match.apply(doc, tag);
    }

    return doc;
  }


  Library.prototype.atIndex = function(n){
    return this.items[n];
  }


  return Library;
})();

