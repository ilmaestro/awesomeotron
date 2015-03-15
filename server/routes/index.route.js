var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { title: 'Kid Awesome' });
});

module.exports = router;