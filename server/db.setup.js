var mongoose = require('mongoose'),
    Playlist = require('./models/playlist.model.js');

function db() {
    // setup db
    mongoose.connect("mongodb://localhost/kiddb");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error"));
    
    // seed the database
    db.once('open', function () {
        console.log("database is open...");
        Playlist.find().exec(function (err, results) {
            if (results.length === 0) {
                var playlist = new Playlist({
                    name: "network awesome",
                    author: "network awesome",
                    category: [{
                            name: "Uncategorized",
                            description: "Uncategorized"
                        }],
                    video: [
                        {
                            title: "Live Music Show",
                            url: "MkyNHhErN0E",
                            order: 1
                        },
                        {
                            title: "David Lynch",
                            url: "cYHOQ6AQ3Rc",
                            order: 2
                        }
                    ]
                });
                playlist.save(function (err) {
                    if (err)
                        throw err;
                    console.log("playlist model seeded.");
                });
            }
        });
    });
    return db;
}


module.exports = db;