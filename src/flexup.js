module.exports = (function(){
  var Flexup,
      Library         = require('./library.js'),
      ParseBuilder    = require('./parse_builder.js'),
      Parser          = require('./parser.js'),
      FTree           = require('./ftree.js'),
      In              = require('./in.js'),
      Translation     = require('./translation.js'),
      Interpretation  = require('./interpretation.js'),
      Grammar         = require('./grammar.js'),
      fs              = require('fs'),
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
    // filepath
    if(typeof input === 'string'){
      new Translation(_readFullFile(input));
    }
    // object 
    else{
      return new Translation(input); 
    }
  }

  Flexup.interpretation = function(input){
    // local or remote module
    if(typeof input === 'string'){
      // local
      if(input[0] == '.' || input[0] == '/'){
        var mod = require(process.cwd() + '/' + input);
        return new Interpretation(mod.interpretate);
      }
      // remote
      else{
        throw "Package channel coming soon.. sorry"
      }
      return new Interpretation(_readFullFile(input));
    }
    // function
    else if(typeof input == 'function'){
      return new Interpretation(input);
    }
    // error
    else{
      throw "Unknown Interpretation action";
    }
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
