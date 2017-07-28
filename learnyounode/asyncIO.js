var fs = require('fs');
var filepath = process.argv[2];

function outputData(err, data) {
  var count = data.split('\n').length - 1;
  console.log(count);
}

fs.readFile(filepath, 'utf8', outputData);
