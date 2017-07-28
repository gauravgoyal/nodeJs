var fs = require('fs');
var path = require('path');
var dirPath = process.argv[2];
var ext = '.' + process.argv[3];

function filterFiles(err, list) {
  list.forEach(function (file) {
    if (path.extname(file) == ext) {
      console.log(file);
    }
  })
}

fs.readdir(dirPath, filterFiles);
