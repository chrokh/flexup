module.exports = (function(){
  var
    xpath         = require('xpath'),
    DOMParser     = require('xmldom').DOMParser,
    XMLSerializer = require('xmldom').XMLSerializer,
    XMLWrapper;


  XMLWrapper = function(xml){
    this._xml = new DOMParser().parseFromString(xml);
  }


  XMLWrapper.prototype.toXML = function(){
    return this._xml.toString();
  }

  // TODO: API:
  // contents.append
  // contents.prepend
  // contents.insert
  // contents.change
  // contents.remove


  XMLWrapper.prototype.rename = function(from, to){
    var nodes = xpath.select(from, this._xml);
    
    for(var i=0; i < nodes.length; i++){
      // TODO: Dirty
      nodes[i].tagName = nodes[i].nodeName = nodes[i].localName = to;
    }
  }

  XMLWrapper.prototype.count = function(xp){
    return xpath.select(xp, this._xml).length;
  }

  XMLWrapper.prototype.map = function(xp, func){
    var nodes = xpath.select(xp, this._xml);

    for(var i=0; i < nodes.length; i++){
      var xml = new XMLSerializer().serializeToString(nodes[i]);
      var wrapped = new XMLWrapper(xml);
      wrapped.index = i;
      nodes[i].data = func(wrapped);
    }
  }

  /*XMLWrapper.prototype.select = function(xp){
    var nodes = xpath.select(xp, this._xml);

    for(var i=0; i < nodes.length; i++){
      var xml = new XMLSerializer().serializeToString(nodes[i]);
      var wrapped = new XMLWrapper(xml);
      nodes[i] = wrapped;
    }

    return nodes;
  }*/

  XMLWrapper.prototype.text = function(){
    var text = '';
    for(var i=0; i<this._xml.childNodes.length; i++){
      text += this._xml.childNodes[i].textContent;
    }
    return text;
  }


  return XMLWrapper;
})();

