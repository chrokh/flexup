module.exports = (function(){
  var Pattern = function(name, pattern){
    this.name    = name;
    this.pattern = pattern;
  };


  Pattern.prototype.execute = function(doc){
    var regex,
        matches;


    regex = new RegExp(this.toRegex());
    //console.log(regex);

    //matches = regex.exec(doc);
    //console.log(matches);

    while((match = regex.exec(doc)) !== null){
      var n,
          full,
          captured,
          replacement;

      full      = match[0];
      captured  = match[1];
      n         = match.index;

      replacement = "<{0}>{1}</{0}>".supplant([this.name, captured]);

      doc = doc.splice(n, full.length, replacement);
    }

    return doc;
  }


  Pattern.prototype.toRegex = function(){
    var outlet,
        regex;

    outlet    = this.pattern.indexOf('%');
    this.pre  = this.pattern.substring(0, outlet);
    this.post = this.pattern.substring(outlet+1);

    this.left  = RegExp.escape(this.pre);
    this.right = RegExp.escape(this.post);


    this.regexstring = this.left + '(.+?)' + this.right;
    this.regex = new RegExp(this.regexstring, "g");

    regex = '';
    regex += this.pre;
    regex += this.post;
    console.log("regex: " + regex);
    console.log(this);


    var r = new RegExp(this.left);
    console.log(r);


    //s = s.replace(/\*/g, '\\*');
    //s = s.replace('%', '(.+)');


    //return s;
    return this.regex;
    return new RegExp(this.regex, "g");
    //return /\*\*(.+?)\*\*/g;
  }


  return Pattern;
})();



// TODO: Move these monkey-patches
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
String.prototype.splice = function( idx, rem, s ) {
  return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
  // http://stackoverflow.com/questions/4313841/javascript-how-can-i-insert-a-string-at-a-specific-index
};
RegExp.escape = function (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
};