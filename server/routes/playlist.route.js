var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), 
    Playlist = require('../models/playlist.model.js');

/* 
GET /playlist
*/
router.get("/", function (req, res, next) {
    Playlist.find(function (err, playlists) {
        if (err) return next(err);
        res.json(playlists)
    });
});

/* 
GET /playlist/:id
*/
router.get("/:id", function (req, res, next) {
    Playlist.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post)
    });
});

/* 
POST /playlist
*/
router.post("/", function (req, res, next) {
    Playlist.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* 
PUT /playlist/:id
*/
router.put("/:id", function (req, res, next) {
    Playlist.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {
            $currentDate: {
                lastUpdated: true
            }
        }, 
        function (err, post) {
        if (err) return next(err);
        res.json(post)
    });
});

/* 
DELETE /playlist/:id
*/
router.delete("/:id", function (req, res, next) {
    Playlist.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post)
    });
});


module.exports = router;