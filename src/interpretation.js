module.exports = (function(){

  Interpretation = function(f){
    this._f = f;
  }

  Interpretation.prototype.interpretate = function(contents){
    this._f(contents);
    return contents;
  }


  return Interpretation;
})();