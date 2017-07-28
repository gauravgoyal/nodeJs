var http = require('http');
var url = process.argv[2];

function outPut(response) {
  response.setEncoding('utf8')
  var serverResponse = '';
  response.on('data', function (data) {
    serverResponse += data.toString();;
  });
  response.on('end', function() {
    console.log(serverResponse.length);
    console.log(serverResponse);
  });
  response.on('error', function(err) {
    console.error(err);
  })
}

http.get(url, outPut);
