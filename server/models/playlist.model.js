var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// setup db schema & model

var VideoSchema = mongoose.Schema({
    title: String,
    url: String,
    order: Number
});

var PlaylistSchema = Schema({
    name: String,
    author: String,
    tags: [String],
    video: [VideoSchema],
    lastUpdated: { type: Date, default: Date.now },
    createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
