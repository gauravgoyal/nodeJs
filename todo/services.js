var http = require('http');
var host = 'dev.ggoyal.co.in';

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
    callback(null, e);
  });
}

exports.createTodo = function(endpoint, method, data, callback, csrf, userCookie) {
  var postData = JSON.stringify(data);
  var options = {
    'host': host,
    'path': endpoint,
    'method': method,
    'headers': {
      '_format': 'hal+json',
      'cookie': userCookie,
      'X-CSRF-Token': csrf,
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

exports.login = function(baseUrl, data, callback) {
  var postData = JSON.stringify(data);
  var options = {
    'host': host,
    'path': baseUrl + 'user/login?_format=json',
    'method': 'POST',
    'headers': {
      '_format': 'json',
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
      'Accept': 'application/json'
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
        responseCookies = res.headers['set-cookie'];
        var requestCookies='';
        for(var i=0; i<responseCookies.length; i++){
          var oneCookie = responseCookies[i];
          oneCookie = oneCookie.split(';');
          requestCookies = requestCookies + oneCookie[0]+';';
        }
        var parsed = JSON.parse(body);
        callback(requestCookies, parsed);
      }
    })
  });
  req.write(postData);
  req.end();
}
