const Parser = require('rss-parser');
const parser = new Parser();

exports.fetchAndSave = async function (url) {
    let feed = await parser.parseURL(url);
    console.log(feed.title);
  
    feed.items.forEach(item => {
        console.log(item.title + ':' + item.link)
    });
}
