var Main = (function(){
  var fs     = require('fs'),
      Flexup = require('./src/flexup.js');

  var Main = function(fup, fupd){
    var flexup;

    if(typeof fup === 'undefined')
      fup  = read_file_arg('fup', 2);
    else
      fup  = read_file(fup);

    if(typeof fupd === 'undefined')
      fupd = read_file_arg('fupd', 3);
    else
      fupd = read_file(fupd);

    if(fup && fupd){
      flexup = new Flexup(fup, fupd);
      console.log(flexup.read());
    }
  }


  function read_file_arg(name, n){
    var src;
    if(process.argv.length > n){
      src = process.argv[n];
      return read_file(src);
    }
    else{
      console.log("MISSING ARGUMENT ("+(n-2)+"): " + name);
      return false;
    }
  }

  function read_file(path){
    var body = fs.readFileSync(path, 'utf-8');
    return body;
  }

  return Main;
})();




// TODO: Hard-coded for convenience :)
if(process.argv.length < 3)
  Main("./examples/trivial.fup", "./examples/example.json");
else
  Main();
