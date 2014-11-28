module.exports = (function(){

  var ASTParser = function(node){
    if(node.length !== undefined && typeof node === 'object'){
      this._parseArray(node);
    }else if(typeof node === 'object'){
      this._parseObject(node);
    }else if(typeof node === 'string'){
      this._content = node;
    }else{
      throw "Could not parse AST";
    }
  }



  ASTParser.prototype.toXML = function(){
    switch(this.type()){

      case 'mixed':
        var str = '';
        for(var i=0; i<this._nodes.length; i++){
          str += this._nodes[i].toXML();
        }
        return str;

      case 'element':
        return "<{0}>{1}</{2}>".supplant([
          this._startTag,
          this._content.toXML(),
          this._endTag]);

      case 'text':
        return this._content;
    }
  }


  ASTParser.prototype.type = function(){
    if(this.isMixed()){
      return "mixed";
    }else if(this.isElement()){
      return "element";
    }else if(this.isText()){
      return "text"
    }else{
      throw "Type error in AST parser";
    }
  }

  ASTParser.prototype.isMixed = function(){
    return typeof this._nodes != 'undefined';
  }

  ASTParser.prototype.isElement = function(){
    return (
      typeof this._startTag != 'undefined'
      && typeof this._endTag != 'undefined'
      && typeof this._content != 'undefined');
  }

  ASTParser.prototype.isText = function(){
    return (
      typeof this._content != 'undefined'
      && typeof this._startTag == 'undefined'
      && typeof this._endTag == 'undefined');
  }


  ASTParser.prototype._parseArray = function(a){
    this._nodes = [];
    for(var i=0; i<a.length; i++){
      this._nodes.push(new ASTParser(a[i]));
    }
  };

  
  ASTParser.prototype._parseObject = function(obj){
    for(var key in obj){
      this._startTag = (key);                   // <foo>
      this._content  = (new ASTParser(obj[key])); // body
      this._endTag   = (key);                   // </foo>
    }
  };






  String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
      function (a, b) {
        var r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      }
      );
    // http://javascript.crockford.com/remedial.html
    // http://stackoverflow.com/questions/1408289/best-way-to-do-variable-interpolation-in-javascript
  };


  return ASTParser;
})();

