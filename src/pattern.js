module.exports = (function(){
  var Pattern = function(name, pattern){
    this.name    = name;
    this.pattern = pattern;
  };

  Pattern.prototype.indexOfOutlet = function(){
    return this.pattern.indexOf('%');
  }

  Pattern.prototype.getLeftPattern = function(){
    return this.pattern.substring(0, this.indexOfOutlet());
  }

  Pattern.prototype.getRightPattern = function(){
    return this.pattern.substring(this.indexOfOutlet() + 1);
  }

  Pattern.prototype.getLeftRegexString = function(){
    return RegExp.escape(this.getLeftPattern());
  }

  Pattern.prototype.getRightRegexString = function(){
    return RegExp.escape(this.getRightPattern());
  }

  Pattern.prototype.toRegexString = function(){
    return this.getLeftRegexString() + '(.+?)' + this.getRightRegexString();
  }

  return Pattern;
})();



// TODO: Move these monkey-patches
String.prototype.splice = function( idx, rem, s ) {
  return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
  // http://stackoverflow.com/questions/4313841/javascript-how-can-i-insert-a-string-at-a-specific-index
};
RegExp.escape = function (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
};
