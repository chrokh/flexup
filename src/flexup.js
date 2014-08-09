module.exports = (function(){
  var Flexup,
      Pattern = require('./pattern.js'),
      Library = require('./library.js'),
      doc;

  Flexup = function(doc, definitions){
    this.doc         = doc;
    this.definitions = JSON.parse(definitions);
    this.library = new Library();
  }

  Flexup.prototype.read = function(){
    for(var key in this.definitions){
      var pattern = new Pattern(key, this.definitions[key]);
      this.library.add(pattern);
    }
    return this.library.execute(this.doc);
  }

  return Flexup;
})();

