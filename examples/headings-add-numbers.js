module.exports = (function(){
  var
    xpath = require('xpath'),
    dom   = require('xmldom').DOMParser;

  /*this.interpretate = function(contents){
    var xml = new dom().parseFromString(contents);

    var heads = xpath.select('/head/text()', xml);
    for(var i=0; i<heads.length; i++){
      heads[i].textValue = "foo";
    }

    var heads = xpath.select('/head/text()', xml);
    for(var i=0; i<heads.length; i++){
      console.log(heads[i].data);
    }

    return xml.toString() 
  };*/

  this.interpretate = function(){
    var n = 0;

  // API:
  // contents.append
  // contents.prepend
  // contents.insert
  // contents.change
  // contents.remove

    contents.change('//heading', function(text){
      return (n++) + ')' + node.text;
    });
  }
}

  return this;
})();
