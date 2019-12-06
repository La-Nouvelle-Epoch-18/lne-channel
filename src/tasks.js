const cron = require('node-cron');

const parser = require('./parser');
const logger = require('./logger');
const { RssSource } = require('./models');

exports.startTasks = function() {
    cron.schedule('* * * * */10', async () => {
        try {
            const sources = await RssSource.find().exec();
            await Promise.all(sources.map(s => parser.fetchAndSave(s.url)));
            logger.info("RSS synchronized successfully");
        }
        catch (err) {
            logger.error(err);
        }
    });
}
