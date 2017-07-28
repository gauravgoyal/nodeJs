var http = require('http');
var url = process.argv[2];

function outPut(response) {
  response.setEncoding('utf8')
  response.on("data", function(data) {
    console.log(data);
  })

  response.on("error", function(data) {
    console.error(data);
  })
}

http.get(url, outPut);
