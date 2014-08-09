module.exports = (function(){
  var Flexup,
      Library = require('./library.js'),
      doc;

  Flexup = function(doc, definitions){
    this.doc         = doc;
    this.definitions = JSON.parse(definitions);
    this.library = new Library();
  }

  Flexup.prototype.read = function(){
    var defs = this.definitions;
    for(var key in defs)
      this.library.add(key, defs[key]);
    return this.library.execute(this.doc);
  }

  return Flexup;
})();

