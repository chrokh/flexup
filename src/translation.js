module.exports = (function(){
  var
    FlxTree  = require('./flxtree.js'),
    xpath    = require('xpath'),
    dom      = require('xmldom').DOMParser;

  Translation = function(contents){
    if(typeof contents !== 'object'){
      this._json = JSON.parse(contents);
    }else{
      this._json = contents;
    }
  }

  Translation.prototype.translate = function(contents){
    var doc = new dom().parseFromString(contents);

    for(var key in this._json){

      var nodes = xpath.select(key, doc);
      for(var i=0; i<nodes.length; i++){
        nodes[i].tagName = this._json[key];
      }
      
    }
    return doc.toString();
  }


  return Translation;
})();