module.exports = (function(){
  var Flexup,
      Pattern = require('./pattern.js'),
      Library = require('./library.js'),
      doc,
      instance;

  Flexup = function(doc, definitions){
    this.doc         = doc;
    this.definitions = definitions;
    this.library = new Library();
  }

  Flexup.prototype.read = function(){
    Flexup.instance = this;
    eval(this.definitions);
    return this.library.execute(this.doc);
  }



  /*
   * DSL function
   */
  function define(name, pattern){
    var pattern = new Pattern(name, pattern);
    Flexup.instance.library.add(pattern);
  }
  

  return Flexup;
})();

