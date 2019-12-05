const router = require('express').Router();

const config = require('./config');
const middlewares = require('./middlewares');
const { RssSource, RssItem } = require('./models');

router.get('/rss', getRSS);
router.post('/rss', middlewares.parseToken, middlewares.verifyToken, addRSS);

module.exports = router;

function getRSS(req, res) {
    let items;
    if (req.query.user) {
        items = RssItem.find({ user: req.query.user }).sort({ pubDate: -1 }).limit(50);
    }
    else {
        items = RssItem.find().sort({ pubDate: -1 }).limit(50);
    }
    res.json(items);
}

function addRSS(req, res) {
    let newSource = new RssSource({ user: req.body.username, url: req.body.url });
    newSource.save(async (err, source) => {
        if (err) {
            res.status(500).json({ err });
        }
        else {
            await fetchAndSave(req.body.url);
            res.status(204);
        }
    });
}
