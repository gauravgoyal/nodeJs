var filterFn = require('./makeItModularModule.js');
var dirPath = process.argv[2];
var ext = process.argv[3];

function checkResult(err, files) {
  if (err) {
    return console.error('There was an error:', err)
  }
  files.forEach(function(file) {
    console.log(file);
  })
}

filterFn(dirPath, ext, checkResult);
