const router = require('express').Router();

const config = require('./config');
const middlewares = require('./middlewares');

router.get('/rss', getRSS);
router.post('/rss', middlewares.parseToken, addRSS);

module.exports = router;

function getRSS(req, res) {
    // TODO:
}

function addRSS(req, res) {
    // TODO:
}
