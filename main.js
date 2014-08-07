var fs     = require('fs'),
    Flexup = require('./src/flexup.js');

var definitions,
    contents,
    result;


definitions = fs.readFileSync('examples/example.fupd', 'utf-8');
contents    = fs.readFileSync('examples/example.fup', 'utf-8');
flexup      = new Flexup(contents, definitions);



console.log(flexup.read());