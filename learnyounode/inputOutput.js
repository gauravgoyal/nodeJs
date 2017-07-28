var fs = require('fs');
var filepath = process.argv[2];
var contents = fs.readFileSync(filepath, 'utf8');
var count = contents.split('\n').length - 1;
console.log(count);
