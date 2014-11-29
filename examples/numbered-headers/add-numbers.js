module.exports = (function(){


  this.interpretate = function(tree){

    tree.map('//heading/text()', function(node){
      return (node.index+1) + '.' + node.text();
    });

    tree.map('//subheading/text()', function(node){
      // TODO: Would be better...
      // var h1  = node.preceding('heading');
      // var old = h1.first().preceding('subheading');

      var i   = node.index + 1;
      var h1  = tree.count('//subheading[position()='+(i)+']/preceding-sibling::heading');
      var old = tree.count('//heading[position()='+(h1)+']/preceding-sibling::subheading');
      var h2  = i - old;
      return h1 + '.' + h2 + '. ' + node.text();
    });

  }

  return this;
})();
