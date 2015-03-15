var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.render('admin', { title: 'Kid Awesome - Admin' });
});

module.exports = router;