module.exports = (function(){
  var Flexup,
      Library      = require('./library.js'),
      ParseBuilder = require('./parse_builder.js'),
      Parser       = require('./parser.js'),
      FTree        = require('./ftree.js'),
      In           = require('./in.js'),
      Translation  = require('./translation.js'),
      Grammar      = require('./grammar.js'),
      fs           = require('fs'),
      doc;

  Flexup = function(doc, definitions){
    this.doc         = doc;
    this.definitions = JSON.parse(definitions);
    //this.library = new Library();
  }

  Flexup.prototype.read = function(){
    console.log("ERROR: Deprecated...");
    /*var parsebuilder = new ParseBuilder(this.definitions);
    var parser = new Parser(parsebuilder.getParser());
    var ast = parser.parse(this.doc);
    var ftree = new FTree(ast);
    return ftree.getFlxML();*/

    //this.library.addMany(this.definitions);
    //return this.library.execute(this.doc);
  }

  Flexup.in = function(filepath){
    return new In(_readFullFile(filepath));
    // TODO: async promise
  }

  Flexup.grammar = function(filepath){
    return new Grammar(_readFullFile(filepath));
  }

  Flexup.translation = function(input){
    if(typeof input === 'string'){
      input = _readFullFile(input);
    }
    return new Translation(input); 
  }



  /*
   *
   * privates
   *
   */
  function _readFullFile(filepath){
    return fs.readFileSync(('./' + filepath), 'utf-8');
  }

  return Flexup;
})();
