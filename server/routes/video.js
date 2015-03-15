var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), 
    models = require('../models/models.js');

/* 
GET /video
*/
router.get("/", function (req, res, next) {
    models.Video.find(function (err, videos) {
        if (err) return next(err);
        res.json(videos)
    });
});

/*
POST /video
*/
router.post("/", function (req, res, next) {
    models.Video.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


/* 
PUT /video/:id
*/
router.get("/:id", function (req, res, next) {
    models.Video.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post)
    });
});


/*
DELETE /video/:id
*/
router.delete("/:id", function (req, res, next) {
    models.Video.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;