var fs = require('fs');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to");
    process.exit(-1);
}

var path = process.argv[2];

fs.stat(path, function(err, stats) {
  console.log(stats);
});
