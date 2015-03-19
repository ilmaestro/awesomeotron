var express = require('express'),
    router = express.Router(), 
    url = require('url'),
    querystring = require('querystring'),
    request = require('request');

/* 
GET /youtube/:id
*/
router.get("/:id", function (req, response, next) {
    //var url = encodeURIComponent(req.params.id);
    var youtubeUrl = url.parse(decodeURIComponent(req.params.id));
    var videoId = youtubeUrl.hostname === 'youtu.be' ? youtubeUrl.pathname.slice(1) : querystring.parse(youtubeUrl.query).v;
    
    request({
        url: 'http://youtube.com/oembed?url=' + req.params.id + '&format=json', 
        json: true
    }, function (err, req_res, body) {
        if (!err && req_res.statusCode === 200) {
            body.videoId = videoId;
            response.send(body); // send the json response
        }
    });
});

module.exports = router;