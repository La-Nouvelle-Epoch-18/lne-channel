const Parser = require('rss-parser');
const parser = new Parser();

const logger = require('./logger');
const { RssItem } = require('./models');

exports.fetchAndSave = async function (url) {
    let feed = await parser.parseURL(url);
    console.log(feed.title);
  
    feed.items.forEach(item => {
        let newSource = new RssItem({ title: item.title, link: item.link, pubDate: item.pubDate, content: item.content });
        newSource.save(async (err, item) => {
            if (err) {
                logger.error("Fail to save item to db");
            }
            else {
                logger.info("RSS item saved");
            }
        });
    });
}
