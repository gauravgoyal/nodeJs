var http = require('http');
var username = 'admin1';
var password = 'admin';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

exports.get = function(get_url, callback) {
  http.get(get_url + '?_format=hal_json', function(res) {
    var body = ''; // Will contain the final response
    // Received data is a buffer.
    // Adding it to our body
    res.on('data', function(data){
      body += data;
    });
    // After the response is completed, parse it and log it to the console
    res.on('end', function() {
      var parsed = JSON.parse(body);
      callback(parsed, null);
    });
  })
  // If any error has occured, log error to console
  .on('error', function(e) {
    console.log("Got error: " + e.message);
    callback(null, e);
  });
}

exports.createTodo = function(endpoint, method, data, callback) {
  var postData = JSON.stringify(data);
  var options = {
    'host': 'todolist.dd',
    'port': 8083,
    'path': endpoint,
    'method': method,
    'headers': {
      '_format': 'hal+json',
      'Authorization': auth,
      'Content-Type': 'application/hal+json',
      'Content-Length': postData.length
    }
  };
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function(){
      if (body) {
        var parsed = JSON.parse(body);
        callback(parsed);
      }
      else {
        callback();
      }
    })
  });
  req.write(postData);
  req.end();
}
