// require the http module of node.js
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fetchVideoInfo = require('youtube-info');
var getYouTubeID = require('get-youtube-id');

// define the port of access for your server
const PORT = 8888;

var server = http.createServer(function(req, res) {
  var page = url.parse(req.url).pathname;
  if (page == '/information') {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/html"});
    if ('youtube' in params) {
      // Get the youtube videoId from entered URL.
      var youtubeId = getYouTubeID(params['youtube']);
      fetchVideoInfo(youtubeId, function (err, videoInfo) {
        if (err) {
          throw new Error(err);
        }
        else {
          output = '<div> Video URL:' + videoInfo.url  + '</div>';
          output += '<div> Video Title:' + videoInfo.title  + '</div>';
          output += '<div> Video Description:' + videoInfo.description  + '</div>';
          res.write(output);
          res.end();
        }
      });
    }
  }
  else if (page !== '/' ) {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.write('<h1>Looks like, you are lost. Please go to <a href="/">Home Page</a></h1>');
    res.end();
  }
  else {
    var output = '<form action="/information" method="get">'
    + '<label>Youtube Video</label>'
    + '<input type="text" name="youtube" placeholder="Enter Youtube Video">'
    + '<input type="submit" value="Submit">'
    + '</form>';
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(output);
    res.end();
  }
});



server.listen(PORT);
