var fetchVideoInfo = require('youtube-info');
var getYouTubeID = require('get-youtube-id');

// Get the youtube url supplied as argument through cli and fetch videoId.
var youtubeId = getYouTubeID(process.argv[2]);

fetchVideoInfo(youtubeId, function (err, videoInfo) {
  if (err) throw new Error(err);
  console.log(videoInfo);
});
