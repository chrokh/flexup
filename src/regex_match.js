module.exports = (function(){
  var RegexMatch = function(match){
    this._raw = match;
  }

  RegexMatch.prototype.apply = function(doc, tag){
    var full        = this.getFullMatch(),
        replacement = this.getReplacementString(tag),
        n           = this._raw.index;
    return doc.splice(n, full.length, replacement);
  }

  RegexMatch.prototype.getReplacementString = function(tag){
    var content = this.getContent();
    return "<{0}>{1}</{0}>".supplant([tag, content]);
  }

  RegexMatch.prototype.getFullMatch = function(){
    return this._raw[0];
  }

  RegexMatch.prototype.getPatternIndex = function(){
    var a = this._raw;
    for(var i=1; i<a.length; i++)
      if((typeof a[i]) != "undefined")
        return i;
  }

  RegexMatch.prototype.getContent = function(){
    return this._raw[this.getPatternIndex()];
  }

  return RegexMatch;
})();



// TODO: Move this monkey-patch
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

