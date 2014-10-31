module.exports = (function(){

  var FTree = function(ast){
    this._ast = ast;
  }

  FTree.prototype.getFlxML = function(){
    return this._buildFlxML();
  }


  FTree.prototype._buildFlxML = function(){
    this._xml = [];
    this._parse(this._ast);

    // TODO: Why does the arr also contain undefined entries?
    //console.log(this._xml.join(''));
    
    return this._xml.join('');
  }

  FTree.prototype._parse = function(node){
    if(node.length !== undefined && typeof node === 'object'){
      this._parseArray(node);
    }else if(typeof node === 'object'){
      this._parseObject(node);
    }else if(typeof node === 'string'){
      this._xml.push(node);
    }else{
      throw "Parse error in ftree";
    }
  }

  FTree.prototype._parseArray = function(a){
    for(var i=0; i<a.length; i++){
      this._parse(a[i]);
    }
  };

  
  FTree.prototype._parseObject = function(obj){
    for(var key in obj){
      this._xml.push("<{0}>".supplant([key]));  // <foo>
      this._xml.push(this._parse(obj[key]));  // content
      this._xml.push("</{0}>".supplant([key])); // </foo>
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


  return FTree;
})();

