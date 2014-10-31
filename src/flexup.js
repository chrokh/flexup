module.exports = (function(){
  var Flexup,
      Library      = require('./library.js'),
      ParseBuilder = require('./parse_builder.js'),
      Parser       = require('./parser.js'),
      doc;

  Flexup = function(doc, definitions){
    this.doc         = doc;
    this.definitions = JSON.parse(definitions);
    //this.library = new Library();
  }

  Flexup.prototype.read = function(){
    var parsebuilder = new ParseBuilder(this.definitions);
    var parser = new Parser(parsebuilder.getParser());
    return parser.parse(this.doc);

    //this.library.addMany(this.definitions);
    //return this.library.execute(this.doc);
  }

  return Flexup;
})();

