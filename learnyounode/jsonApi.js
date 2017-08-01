var http = require('http');
var url = require('url');
var querystring = require('querystring');

function parsetime (time) {
  var date = new Date(time);
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }
}

function unixTimestamp(time) {
  var date = new Date(time);
  return {
    unixtime: date.getTime()
  }
}

var server = http.createServer(function(req, res) {
  var route = url.parse(req.url).pathname;
  if (route == '/api/parsetime') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var params = querystring.parse(url.parse(req.url).query);
    if ('iso' in params){
      var isoDate = params['iso'];
      res.end(JSON.stringify(parsetime(isoDate)));
    }
  }

  if (route == '/api/unixtime') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var params = querystring.parse(url.parse(req.url).query);
    if ('iso' in params) {
      var isoDate = params['iso'];
      res.end(JSON.stringify(unixTimestamp(isoDate)));
    }
  }


})

server.listen(process.argv[2]);
