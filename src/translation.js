module.exports = (function(){
  var
    xpath    = require('xpath'),
    dom      = require('xmldom').DOMParser;

  Translation = function(contents){
    if(typeof contents !== 'object'){
      this._json = JSON.parse(contents);
    }else{
      this._json = contents;
    }
  }

  Translation.prototype.translate = function(tree){
    for(var key in this._json){
      tree.rename(key, this._json[key]);
    }
    return tree;
  }


  return Translation;
})();