module.exports = (function(){
  var Library = function(){
    this.items = [];
  };

  Library.prototype.add = function(item){
    this.items.push(item);
  }

  Library.prototype.execute = function(doc){
    for(var i=0; i<this.items.length; i++){
      var pattern = this.items[i];
      doc = pattern.execute(doc);
    }
    return doc;
  }

  return Library;
})();