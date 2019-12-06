const router = require('express').Router();

const parser = require('./parser');
const logger = require('./logger');
const middlewares = require('./middlewares');
const { RssSource, RssItem } = require('./models');

router.get('/rss', getRSS);
router.post('/rss', middlewares.parseToken, middlewares.verifyToken, addRSS);

module.exports = router;

async function getRSS(req, res) {
    try {
        let items;
        if (req.query.user) {
            items = await RssItem.find({ user: req.query.user }).sort({ ts: -1 }).limit(50);
        }
        else {
            items = await RssItem.find().sort({ ts: -1 }).limit(50);
        }
        res.json(items);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ err });
    }
}

async function addRSS(req, res) {
    if (req.token.userType !== "school") {
        res.status(403).json({ err: "Permission deny" });
    }
    else {
        try {
            const result = await RssSource.findOne({ url: req.body.url });
            if (result) {
                res.status(409).json({ message: "Already present" });
            }
            else {
                let newSource = new RssSource({ user: req.payload.userId, url: req.body.url });
                await newSource.save();
                await parser.fetchAndSave(req.body.url);
                res.status(204).end();
            }
        }
        catch (err) {
            logger.error(err);
            res.status(500).json({ err });
        }
    }
}
