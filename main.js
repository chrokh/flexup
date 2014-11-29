var Main = (function(){
  var fs     = require('fs'),
      Flexup = require('./src/flexup.js');

  this.Pair = function(fup, fupd){
    var flexup;

    fup  = _readf(fup)
    fupd = _readf(fupd)

    flexup = new Flexup(fup, fupd);
    var xml = flexup.read();

    console.log(xml);
    _writef('first.xml', xml);
  }

  function _writef(name, contents){
    fs.writeFileSync(('./debug/'+name), contents, 'utf-8');
  }

  function _readf(path){
    return fs.readFileSync(('./' + path), 'utf-8');
  }



  this.Orchestration = function(){
    Flexup.in("examples/numbered-headers/in.fup")
      .pipe(Flexup.grammar("examples/numbered-headers/grammar.json"))
      .pipe(Flexup.translation({
        "//subheading" : "subhead",
        "//heading"    : "head"
      }))
      .pipe(Flexup.interpretation('./examples/numbered-headers/add-numbers.js'))
      .pipe(Flexup.translation({
        "//subhead" : "h2",
        "//head"    : "h1"
      }))
      .out('foo');
      /*.pipe(Flexup.translation({
        "subheading" : "h2",
        "." : "p"
      }))
      .pipe(Flexup.interpretation("html-wrap"))
      .out("./[numbered].html");*/
  }

  return this;
})();




/*
 * = = = = = =
 *    MAIN
 * = = = = = =
 */
 
// TODO: Hard-coded for convenience :)
if(process.argv.length < 3)
  Main.Orchestration();
else{
  var fup  = process.argv[2].toString();
  var fupd = process.argv[3].toString();
  Main.Pair(fup, fupd);
}
