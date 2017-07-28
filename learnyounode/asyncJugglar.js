var http = require('http');
var result = [];
var count = 0;

function httpGet(index) {
  http.get(process.argv[index], function(response){
    response.setEncoding('utf8')
    var serverResponse = '';
    response.on('data', function (data) {
      serverResponse += data.toString();;
    });
    response.on('end', function() {
      result[index] = serverResponse;
      count++;

      if (count == 3) {
        result.forEach(function(data) {
          console.log(data);
        })
      }
    });
    response.on('error', function(err) {
      console.error(err);
    })
  });
}


for (var i = 2; i < process.argv.length; i++) {
  httpGet(i);
}
