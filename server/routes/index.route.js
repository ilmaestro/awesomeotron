var express = require('express'),
    router = express.Router();

var youtubedl = require('youtube-dl');
var url = 'https://www.youtube.com/watch?v=4MUuDFeoyvM';
// Optional arguments passed to youtube-dl.
var options = [];


router.get('/', function (req, res) {
    res.render('index', { title: 'Kid Awesome' });
});

router.get('/ytdl', function (req, res) {
    //youtubedl.getInfo(url, options, function (err, info) {
    //    if (err) throw err;
        
    //    console.log('id:', info.id);
    //    console.log('title:', info.title);
    //    console.log('url:', info.url);
    //    console.log('thumbnail:', info.thumbnail);
    //    console.log('description:', info.description);
    //    console.log('filename:', info._filename);
    //    console.log('format id:', info.format_id);
    //});
    res.render('ytdl', { title: 'YTDL Test', url: ""});
    
});

module.exports = router;


