var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyparser = require('body-parser'),
    db = require('./server/db.setup.js')(), //execute 
    index = require("./server/routes/index.route.js"),
    youtube = require("./server/routes/youtube.route.js"),
    playlist = require("./server/routes/playlist.route.js");

var port = process.env.port || 1337;

// setup app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", index);
app.use("/api/playlist", playlist);
app.use("/api/youtube", youtube);

app.listen(port);