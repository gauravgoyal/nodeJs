var fs = require('fs');
var path = require('path');

module.exports = function(dirPath, ext, callback) {
  fs.readdir(dirPath, function(err, list) {
    if (err) {
      return callback(err, list);
    }
    list = list.filter(function (file) {
      return path.extname(file) === '.' + ext
    })
    return callback(null, list);
  });
}
