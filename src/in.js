module.exports = (function(){
  var
    Parser      = require('./parser.js'),
    FlxTree     = require('./flxtree.js'),
    In;

  In = function(contents){
    this._contents = contents;
  }

  In.prototype.pipe = function(action){
    if(typeof action.parse != 'undefined'){
      var parsed = action.parse(this._contents);
      this._contents = new FlxTree(parsed).toXML();
    }

    else if(typeof action.translate != 'undefined'){
      this._contents = action.translate(this._contents);
    }

    else if(typeof action.interpretate != 'undefined'){
      this._contents = action.interpretate(this._contents);
    }

    else{
      throw "Unknown pipe";
    }

    return this;
  }

  In.prototype.out = function(filepath){
    // write to file
    console.log(this._contents);
  }


  return In;
})();