module.exports = (function(){
  var
    Parser      = require('./parser.js'),
    ASTParser   = require('./astparser.js'),
    In;

  In = function(contents){
    this._contents = contents;
  }

  In.prototype.pipe = function(action){
    if(typeof action.parse != 'undefined'){
      this._tree = action.parse(this._contents);
    }

    else if(typeof action.translate != 'undefined'){
      this._tree = action.translate(this._tree);
    }

    else if(typeof action.interpretate != 'undefined'){
      this._tree = action.interpretate(this._tree);
    }

    else{
      throw "Unknown pipe";
    }

    return this;
  }

  In.prototype.stdout = function(){
    console.log(this._tree.toXML());
  }

  In.prototype.out = function(filepath){
    // write to file
    throw "TODO: Not implemented yet!"
  }


  return In;
})();