var Main = (function(){
  var fs     = require('fs'),
      Flexup = require('./src/flexup.js');

  var Main = function(fup, fupd){
    var flexup;

    fup  = readf(fup)
    fupd = readf(fupd)

    flexup = new Flexup(fup, fupd);
    var xml = flexup.read();

    console.log(xml);
    writef('first.xml', xml);
  }

  function writef(name, contents){
    fs.writeFileSync(('./debug/'+name), contents, 'utf-8');
  }

  function readf(path){
    return fs.readFileSync(('./' + path), 'utf-8');
  }

  return Main;
})();




/*
 * = = = = = =
 *    MAIN
 * = = = = = =
 */
 
// TODO: Hard-coded for convenience :)
if(process.argv.length < 3)
  Main("examples/trivial.fup", "examples/basic-fupd.json");
else{
  var fup  = process.argv[2].toString();
  var fupd = process.argv[3].toString();
  Main(fup, fupd);
}
