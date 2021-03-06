const mongoose = require('mongoose');

const RssSourceSchema = new mongoose.Schema({
    user: {
        type: String,
        index: true
    },
    url: {
        type: String
    }
});

const RssItemSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true,
        trim: true
    },
    link: {
        type: String,
    },
    content: {
        type: String,
    },
    ts: {
        type: Date,
        index: true
    },
    user: {
        type: String,
        index: true
    }
});

const RssSource = mongoose.model('rssSource', RssSourceSchema);
const RssItem = mongoose.model('rssItem', RssItemSchema);

module.exports = {
    RssSource,
    RssItem
};
