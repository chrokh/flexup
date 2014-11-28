module.exports = (function(){
  var
    xpath       = require('xpath'),
    DOMParser   = require('xmldom').DOMParser,
    XMLWrapper;


  XMLWrapper = function(xml){
    this._xml = new DOMParser().parseFromString(xml);
  }


  XMLWrapper.prototype.toXML = function(){
    return this._xml.toString();
  }

  XMLWrapper.prototype.rename = function(from, to){
    var nodes = xpath.select(from, this._xml);

    for(var i=0; i < nodes.length; i++){
      nodes[i].tagName = to;
    }
  }


  return XMLWrapper;
})();

